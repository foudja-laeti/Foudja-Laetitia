// src/app/features/dashboard/dashboard.routes.ts

import { AdminDashboard } from '../dashboard/admin-dashboard/admin-dashboard';
import { TeacherDashboard } from '../dashboard/teacher-dashboard/teacher-dashboard';
import { StudentDashboard } from '../dashboard/student-dashboard/student-dashboard';
import { roleGuard } from '../../core/guards/role-guard';
import { UserRole } from '../../core/models/user.model';

export const dashboardRoutes = [
  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [roleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.PROVISEUR] }
  },
  {
    path: 'teacher',
    component: TeacherDashboard,
    canActivate: [roleGuard],
    data: { roles: [UserRole.ENSEIGNANT, UserRole.SURVEILLANT] }
  },
  {
    path: 'student',
    component: StudentDashboard,
    canActivate: [roleGuard],
    data: { roles: [UserRole.ETUDIANT] }
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full' as const
  }
];