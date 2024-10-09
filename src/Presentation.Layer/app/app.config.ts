import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, UrlSerializer } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BaseUrlInterceptor } from '../../Application.Layer/Interceptors/BaseUrlInterceptor';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { JwtInterceptor } from '../../Application.Layer/Interceptors/jwt-interceptor.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AuthGuardService } from '../../Application.Layer/Authentication/auth-guard.service';
import { AuthenticationService } from '../../Application.Layer/Authentication/authentication-service.service';
import { LowerCaseUrlSerializer } from '../../Application.Layer/Helpers/LowerCaseUrlSerializer';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: 'JWT_TOKEN', useValue: 'JWT_TOKEN' },
    { provide: 'REFRESH_TOKEN', useValue: 'REFRESH_TOKEN' },
    { provide: 'EXPIRE_IN', useValue: 30 },
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
    JwtHelperService,
    AuthenticationService,
    importProvidersFrom(FormsModule), 
    provideAnimationsAsync(), 
    provideHttpClient()
  ]
};
