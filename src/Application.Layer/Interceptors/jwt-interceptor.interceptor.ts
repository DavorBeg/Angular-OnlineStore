import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { AuthGuardService } from "../Authentication/auth-guard.service";
import { AuthenticationService } from "../Authentication/authentication-service.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs/internal/observable/throwError";
import { MessageService } from "primeng/api";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    
    intercept(request: HttpRequest<any>, next: HttpHandler) {

        let authService = inject(AuthenticationService);
        let router = inject(Router);

        const token = localStorage.getItem(authService.JWT_TOKEN)
        if(token)
        {
          const authorizedRequest = request.clone({
            setHeaders: { Authorization: token }
          })
            authService.refreshAccessToken()
            .pipe(
              tap(tokens => 
                { 
                  localStorage.setItem(authService.JWT_TOKEN, tokens.accessToken); 
                  next.handle(request.clone({setHeaders: { Authorization: tokens.accessToken }}))
                }),
              catchError((error) => { 
                return next.handle(request);
              })
            ).subscribe();

          return next.handle(authorizedRequest);
        }
        else
        {
          authService.logout();
        }

        return next.handle(request);
    }
    
}