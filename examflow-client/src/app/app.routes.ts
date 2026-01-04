// src/app/app.routes.ts

import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { UserRole } from './core/models/user.model';

export const routes = [
  // Redirect root to login
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full' as const
  },

  // Auth Routes (No Layout - Public)
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout')
      .then(m => m.AuthLayout),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login')
          .then(m => m.Login)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/forgot-password/forgot-password')
          .then(m => m.ForgotPassword)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full' as const
      }
    ]
  },

  // Main App Routes (With Layout - Protected)
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout')
      .then(m => m.MainLayout),
    canActivate: [authGuard],
    children: [
      // Dashboard Routes
      {
        path: 'dashboard/admin',
        canActivate: [roleGuard],
        data: { roles: [UserRole.ADMIN, UserRole.PROVISEUR, UserRole.SURVEILLANT] },
        loadComponent: () => import('./features/dashboard/admin-dashboard/admin-dashboard')
          .then(m => m.AdminDashboard)
      },
      {
        path: 'dashboard/teacher',
        canActivate: [roleGuard],
        data: { roles: [UserRole.ENSEIGNANT, UserRole.SURVEILLANT] },
        loadComponent: () => import('./features/dashboard/teacher-dashboard/teacher-dashboard')
          .then(m => m.TeacherDashboard)
      },
      {
        path: 'dashboard/student',
        canActivate: [roleGuard],
        data: { roles: [UserRole.ETUDIANT] },
        loadComponent: () => import('./features/dashboard/student-dashboard/student-dashboard')
          .then(m => m.StudentDashboard)
      }
    ]
  },

  // Wildcard route - 404
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];