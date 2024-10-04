import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForAuthenticationDto } from '../../Domain.Layer/Shared/DTOs/Authentication/UserForAuthenticateDto.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AuthenticatedUserDto } from '../../Domain.Layer/Shared/DTOs/Authentication/AuthenticatedUserDto.model';
import { of } from 'rxjs/internal/observable/of';
import { RefreshTokenDto } from '../../Domain.Layer/Shared/DTOs/Authentication/RefreshTokenDto.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isLogged: boolean = false;
  public JWT_TOKEN = 'JWT_TOKEN';
  public EXPIRE_IN = 30;

  constructor(private http: HttpClient) { }

  isAuthenticated = () => this.isLogged;

  login(userLoginDto: UserForAuthenticationDto): Observable<boolean> 
  {

    return this.http.post<AuthenticatedUserDto>('login', userLoginDto)
    .pipe(
        map(response => { 
          localStorage.setItem(this.JWT_TOKEN, response.accessToken); 
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

  refreshAccessToken(): Observable<RefreshTokenDto>
  {
    let token = localStorage.getItem(this.JWT_TOKEN);
    
    return this.http.post<RefreshTokenDto>("refresh", { "refreshToken": token, "expiresInMins": this.EXPIRE_IN })
    .pipe(
      catchError(error => {
        console.log(error);
        this.isLogged = false;
        return throwError(() => new Error("Token refresh server error."))
      })
    )
  }

  logout(): void
  {
    localStorage.removeItem(this.JWT_TOKEN)
    this.isLogged = false;
  }


}
