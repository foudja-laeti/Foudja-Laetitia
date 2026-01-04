import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard = (route: any) => {
  const authService = inject(AuthService);
  const allowedRoles = route?.data?.['roles'] || [];
  
  if (!authService.isAuthenticated()) {
    return ['/auth/login'];
  }

  if (authService.hasRole(allowedRoles)) {
    return true;
  }

  const dashboardRoute = authService.getDashboardRoute();
  return [dashboardRoute];
};
