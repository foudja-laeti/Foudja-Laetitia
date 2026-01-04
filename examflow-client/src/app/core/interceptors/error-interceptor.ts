import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor = (req: any, next: any) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: any) => {
      if (error.status === 401) {
        authService.logout();
        window.location.href = '/auth/login';
      }
      return throwError(() => error);
    })
  );
};