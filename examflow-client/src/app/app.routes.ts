// src/app/app.routes.ts - CORRIGÉ AVEC CHILDREN
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';
import { UserRole } from './core/models/user.model';

export const routes: Routes = [
  // Redirect root to login
  { 
    path: '', 
    redirectTo: '/auth/login', 
    pathMatch: 'full'
  },
  
  // Auth Routes
  {
    path: 'auth',
    loadComponent: () => import('./layouts/auth-layout/auth-layout').then(m => m.AuthLayout),
    children: [
      { 
        path: 'login', 
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login) 
      },
      { 
        path: 'forgot-password', 
        loadComponent: () => import('./features/auth/forgot-password/forgot-password').then(m => m.ForgotPassword) 
      },
      { 
        path: '', 
        redirectTo: 'login', 
        pathMatch: 'full'
      }
    ]
  },

  // MainLayout → Student/Teacher
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard/teacher',
        canActivate: [roleGuard],
        data: { roles: [UserRole.ENSEIGNANT, UserRole.SURVEILLANT] },
        loadComponent: () => import('./features/dashboard/teacher-dashboard/teacher-dashboard').then(m => m.TeacherDashboard)
      },
      {
        path: 'dashboard/student',
        canActivate: [roleGuard],
        data: { roles: [UserRole.ETUDIANT] },
        loadComponent: () => import('./features/dashboard/student-dashboard/student-dashboard').then(m => m.StudentDashboard)
      }
    ]
  },

  // AdminLayout avec CHILDREN - C'EST ÇA LE PROBLÈME !
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.PROVISEUR, UserRole.SURVEILLANT] },
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      // Dashboard Admin - Route par défaut
      {
        path: '',
        loadComponent: () => import('./features/dashboard/admin-dashboard/admin-dashboard').then(m => m.AdminDashboardComponent)
      },
      // Départements
      /*{
        path: 'departments',
        loadComponent: () => import('./features/admin/departments/departments.component').then(m => m.DepartmentsComponent)
      },
      // Programmes
      {
        path: 'programs',
        loadComponent: () => import('./features/admin/programs/programs.component').then(m => m.ProgramsComponent)
      },
      // Unités d'Enseignement
      {
        path: 'course-units',
        loadComponent: () => import('./features/admin/course-units/course-units.component').then(m => m.CourseUnitsComponent)
      },
      // Années Académiques
      {
        path: 'academic-years',
        loadComponent: () => import('./features/admin/academic-years/academic-years.component').then(m => m.AcademicYearsComponent)
      },
      // Paramètres
      {
        path: 'settings',
        loadComponent: () => import('./features/admin/settings/settings.component').then(m => m.SettingsComponent)
      }*/
    ]
  },

  // 404
  { 
    path: '**', 
    redirectTo: '/auth/login' 
  }
];