import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpResponseBase } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { AuthenticationService } from "../Authentication/authentication-service.service";
import { Router } from "@angular/router";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { Observable, pipe, throwError } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService, private router: Router, private jwtHelper: JwtHelperService) {}
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {

      // try to get token from localstorage
      const token = localStorage.getItem(this.authService.JWT_TOKEN)
      const isExpired = this.jwtHelper.isTokenExpired(token);
      if(token)
      {
        if (!isExpired) {
  
          // if token exist I will clone given request and put it in authorization and return that modified request.
          const authorizedRequest = request.clone({
            setHeaders: { Authorization: token }
          });
  
          return next.handle(authorizedRequest);
  
        }
        else
        {
          const isExpired = this.jwtHelper.isTokenExpired(token);
          console.log(isExpired);
            return this.handleTokenExpired(request, next);
        }
      }
      return next.handle(request);
    }

    private handleTokenExpired(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
    {

    }

    
}