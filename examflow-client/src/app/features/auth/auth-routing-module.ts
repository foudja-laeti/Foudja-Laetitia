// src/app/features/auth/auth.routes.ts

import { Login } from './login/login';
//import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

export const authRoutes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'forgot-password',
    //component: ForgotPasswordComponent
    loadComponent: () => import('./forgot-password/forgot-password').then(m => m.ForgotPassword)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full' as const
  }
];