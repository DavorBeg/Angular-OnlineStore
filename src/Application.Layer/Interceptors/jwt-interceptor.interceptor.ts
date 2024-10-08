import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../Authentication/authentication-service.service";
import { Router } from "@angular/router";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Observable, pipe, throwError } from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    isRefreshing: boolean = false;

    constructor(private authService: AuthenticationService, private router: Router) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {

      // try to get token from localstorage
      const token = localStorage.getItem(this.authService.JWT_TOKEN())
      if(token)
      {

          // if token exist I will clone given request and put it in authorization and return that modified request.
        const authorizedRequest = request.clone({
          setHeaders: { Authorization: token }
        });

        return next.handle(authorizedRequest);
  
      }
      return next.handle(request).pipe(
        catchError((error) => {
          const e = error as HttpResponseBase;
          if(e.status == 401)
          {
            return this.handleTokenExpired(request, next);
          }

          return throwError(() => error);
          
        }))
    }

    private handleTokenExpired(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {
      return this.authService.refreshAccessToken().pipe(
        switchMap((x) => {
          const token = localStorage.getItem(this.authService.JWT_TOKEN());
          if(token)
          {
            const newAuthorizedRequest = request.clone({
              setHeaders: { Authorization: token }
            });     
            return next.handle(newAuthorizedRequest);
          }
          throw new Error('Error on refreshing login session.');
        }),
        catchError((error) => {
          return throwError(() => new Error(error))
        })
      );
    }

    
}