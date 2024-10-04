import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication-service.service';

export const AuthGuardService : CanActivateFn = () => {

  let isAuthenticated = inject(AuthenticationService).isAuthenticated();
  let router = inject(Router);

  if(isAuthenticated) {
    return true;
  }
  else 
  {
    router.navigate(['/Login']);
    return false;
  }

}
