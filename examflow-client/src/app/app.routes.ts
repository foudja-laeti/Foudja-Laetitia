// src/app/app.routes.ts
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
  
  // Auth Routes (sans layout)
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

  // ============================================
  // ADMIN LAYOUT avec toutes ses routes
  // ============================================
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
     /* {
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

  // ============================================
  // TEACHER LAYOUT avec toutes ses routes
  // ============================================
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.ENSEIGNANT, UserRole.SURVEILLANT] },
    loadComponent: () => import('./layouts/teacher-layout/teacher-layout').then(m => m.TeacherLayoutComponent),
    children: [
      // Dashboard Enseignant - Route par défaut
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/teacher-dashboard/teacher-dashboard').then(m => m.TeacherDashboard)
      },
      
    ]
  },

  // ============================================
  // STUDENT LAYOUT avec toutes ses routes
  // ============================================
  {
    path: 'student',
    canActivate: [authGuard, roleGuard],
    data: { roles: [UserRole.ETUDIANT] },
    loadComponent: () => import('./layouts/student-layout/student-layout').then(m => m.StudentLayoutComponent),
    children: [
      // Dashboard Étudiant - Route par défaut
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/student-dashboard/student-dashboard').then(m => m.StudentDashboard)
      },
      
    ]
  },

  // ============================================
  // REDIRECTIONS POUR COMPATIBILITÉ
  // ============================================
  // Anciennes routes → Nouvelles routes
  {
    path: 'dashboard/teacher',
    redirectTo: 'teacher/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard/student',
    redirectTo: 'student/dashboard',
    pathMatch: 'full'
  },

  // ============================================
  // 404 - Page non trouvée
  // ============================================
  { 
    path: '**', 
    redirectTo: '/auth/login' 
  }
];