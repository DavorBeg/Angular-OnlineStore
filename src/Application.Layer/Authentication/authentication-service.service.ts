import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForAuthenticationDto } from '../../Domain.Layer/Shared/DTOs/Authentication/UserForAuthenticateDto.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthenticatedUserDto } from '../../Domain.Layer/Shared/DTOs/Authentication/AuthenticatedUserDto.model';
import { of } from 'rxjs/internal/observable/of';
import { RefreshTokenDto } from '../../Domain.Layer/Shared/DTOs/Authentication/RefreshTokenDto.model';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLogged: boolean = false;
  public JWT_TOKEN = 'JWT_TOKEN';
  public REFRESH_TOKEN = 'REFRESH_TOKEN';
  public EXPIRE_IN = 1;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  isAuthenticated = () => this.isLogged;

  changeAuthenticationState(): void
  {
    const token = localStorage.getItem(this.JWT_TOKEN);
    if(token) { this.jwtHelper.isTokenExpired(token) ? this.isLogged = false : this.isLogged = true; }
    else { 
      this.isLogged = false; 
    }

  }

  login(userLoginDto: UserForAuthenticationDto): Observable<boolean> 
  {

    return this.http.post<AuthenticatedUserDto>('auth/login', userLoginDto)
    .pipe(
        map(response => { 
          this.SaveAccessToken(response.accessToken);
          this.SaveRefreshToken(response.refreshToken);
          this.isLogged = true; 
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.isLogged = false;
          return of(false);
        })
    );

  }

  private SaveAccessToken(token: string)
  {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.setItem(this.JWT_TOKEN, token); 
  }

  private SaveRefreshToken(refreshToken: string)
  {
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  refreshAccessToken(): Observable<RefreshTokenDto>
  {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);
    return this.http.post<RefreshTokenDto>("auth/refresh", { "refreshToken": refreshToken, "expiresInMins": this.EXPIRE_IN }).pipe(
      tap((response) => {
        this.SaveAccessToken(response.accessToken);
      }),
      catchError((error) => {
        console.error('Error refreshing access token:', error);
        return throwError(error);       
      })
    )
  }

  logout(): void
  {
    localStorage.removeItem(this.JWT_TOKEN)
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.isLogged = false;
  }

}
