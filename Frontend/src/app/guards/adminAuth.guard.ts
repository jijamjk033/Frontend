import { AuthService } from './../services/auth.service';
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.LoggedIn) {
    return router.navigate(['/adminlogin']);
  } else {
    return true;
  }
};