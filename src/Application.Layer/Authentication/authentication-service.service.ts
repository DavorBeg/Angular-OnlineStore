import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { UserForAuthenticationDto } from '../../Domain.Layer/Shared/DTOs/Authentication/UserForAuthenticateDto.model';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthenticatedUserDto } from '../../Domain.Layer/Shared/DTOs/Authentication/AuthenticatedUserDto.model';
import { of } from 'rxjs/internal/observable/of';
import { RefreshTokenDto } from '../../Domain.Layer/Shared/DTOs/Authentication/RefreshTokenDto.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../Domain.Layer/Entities/User.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLogged: boolean = false;
  _JWT_TOKEN: string = '';
  _REFRESH_TOKEN: string = '';
  _EXPIRE_IN: number = 0;

  public JWT_TOKEN = () => this._JWT_TOKEN;
  public REFRESH_TOKEN = () => this._REFRESH_TOKEN;
  public EXPIRE_IN = () => this._EXPIRE_IN;

  constructor(private http: HttpClient, 
              private jwtHelper: JwtHelperService, 
              @Inject('JWT_TOKEN') private jwt: string,
              @Inject('REFRESH_TOKEN') private refreshToken: string,
              @Inject('EXPIRE_IN') private expireTime: number) { this._JWT_TOKEN = jwt; this._REFRESH_TOKEN = refreshToken; this._EXPIRE_IN = expireTime; }

  isAuthenticated = () => this.isLogged;

  changeAuthenticationState(): void
  {
    const token = localStorage.getItem(this.JWT_TOKEN());
    const tokenExpired = this.jwtHelper.isTokenExpired(token);
    if(token) { 
      tokenExpired ? this.refreshAccessToken().subscribe() : this.isLogged = true;
    }
    else { 
      this.isLogged = false; 
    }
  }

  getCurrentLoggedUser = (): Observable<User> => this.http.get<User>('auth/me');

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
    localStorage.removeItem(this.JWT_TOKEN());
    localStorage.setItem(this.JWT_TOKEN(), token); 
  }

  private SaveRefreshToken(refreshToken: string)
  {
    localStorage.removeItem(this.REFRESH_TOKEN());
    localStorage.setItem(this.REFRESH_TOKEN(), refreshToken);
  }

  refreshAccessToken(): Observable<RefreshTokenDto>
  {
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN());
    return this.http.post<RefreshTokenDto>("auth/refresh", { "refreshToken": refreshToken, "expiresInMins": this.EXPIRE_IN })
    .pipe(
      tap((response) => {
        this.SaveAccessToken(response.accessToken);
        this.isLogged = true;
      }),
      catchError((error) => {
        console.error('Error refreshing access token:', error);
        return throwError(() => new Error(error));       
      })
    )
  }

  logout(): void
  {
    localStorage.removeItem(this.JWT_TOKEN())
    localStorage.removeItem(this.REFRESH_TOKEN());
    this.isLogged = false;
  }

}
