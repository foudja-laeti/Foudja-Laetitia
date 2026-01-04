import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor = (req: any, next: any) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};