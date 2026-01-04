// src/app/core/services/mock-data.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { DashboardStats, Activity } from '../models/stats.model';
import { Grade, Subject, Class } from '../models/grade.model';
import { UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  /**
   * Statistiques Dashboard Admin
   */
  getAdminStats(): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalStudents: 1245,
      totalTeachers: 87,
      totalClasses: 42,
      totalSubjects: 156,
      pendingGrades: 234,
      validatedGrades: 1876,
      averageSuccess: 78.5,
      recentActivities: [
        {
          id: '1',
          type: 'GRADE_VALIDATED',
          description: 'Notes de Mathématiques validées pour Terminale S1',
          user: 'M. Dubois (Surveillant)',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          icon: 'check-circle',
          color: 'success'
        },
        {
          id: '2',
          type: 'BULLETIN_GENERATED',
          description: 'Bulletins générés pour Seconde A',
          user: 'Système',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          icon: 'file-text',
          color: 'info'
        },
        {
          id: '3',
          type: 'GRADE_SUBMITTED',
          description: 'Notes de Physique soumises',
          user: 'Mme. Laurent',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          icon: 'upload',
          color: 'warning'
        }
      ]
    };

    return of(stats).pipe(delay(500));
  }

  /**
   * Statistiques Dashboard Enseignant
   */
  getTeacherStats(teacherId: string): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalClasses: 5,
      totalSubjects: 3,
      totalStudents: 187,
      pendingGrades: 12,
      validatedGrades: 95,
      averageSuccess: 82.3,
      recentActivities: [
        {
          id: '1',
          type: 'GRADE_SUBMITTED',
          description: 'Notes de DS soumises pour Terminale S1',
          user: 'Vous',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          icon: 'upload',
          color: 'success'
        },
        {
          id: '2',
          type: 'GRADE_VALIDATED',
          description: 'Vos notes de Composition validées',
          user: 'M. Directeur',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
          icon: 'check-circle',
          color: 'info'
        }
      ]
    };

    return of(stats).pipe(delay(500));
  }

  /**
   * Statistiques Dashboard Étudiant
   */
  getStudentStats(studentId: string): Observable<DashboardStats> {
    const stats: DashboardStats = {
      totalSubjects: 12,
      averageSuccess: 15.8,
      recentActivities: [
        {
          id: '1',
          type: 'GRADE_SUBMITTED',
          description: 'Nouvelle note en Mathématiques : 16/20',
          user: 'M. Dupont',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          icon: 'star',
          color: 'success'
        },
        {
          id: '2',
          type: 'BULLETIN_GENERATED',
          description: 'Bulletin du 1er Trimestre disponible',
          user: 'Administration',
          timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
          icon: 'file-text',
          color: 'info'
        }
      ]
    };

    return of(stats).pipe(delay(500));
  }

  /**
   * Matières d'un enseignant
   */
  getTeacherSubjects(teacherId: string): Observable<Subject[]> {
    const subjects: Subject[] = [
      {
        id: '1',
        name: 'Mathématiques',
        code: 'MATH101',
        coefficient: 5,
        teacherId: teacherId,
        teacherName: 'Jean Dupont',
        department: 'Sciences'
      },
      {
        id: '2',
        name: 'Physique',
        code: 'PHY101',
        coefficient: 4,
        teacherId: teacherId,
        teacherName: 'Jean Dupont',
        department: 'Sciences'
      },
      {
        id: '3',
        name: 'Chimie',
        code: 'CHI101',
        coefficient: 3,
        teacherId: teacherId,
        teacherName: 'Jean Dupont',
        department: 'Sciences'
      }
    ];

    return of(subjects).pipe(delay(400));
  }

  /**
   * Classes d'un enseignant
   */
  getTeacherClasses(teacherId: string): Observable<Class[]> {
    const classes: Class[] = [
      {
        id: '1',
        name: 'Terminale S1',
        level: 'Terminale',
        department: 'Sciences',
        studentCount: 35,
        academicYear: '2024-2025'
      },
      {
        id: '2',
        name: 'Terminale S2',
        level: 'Terminale',
        department: 'Sciences',
        studentCount: 38,
        academicYear: '2024-2025'
      },
      {
        id: '3',
        name: 'Première S',
        level: 'Première',
        department: 'Sciences',
        studentCount: 42,
        academicYear: '2024-2025'
      }
    ];

    return of(classes).pipe(delay(400));
  }

  /**
   * Notes d'un étudiant
   */
  getStudentGrades(studentId: string): Observable<Grade[]> {
    const grades: Grade[] = [
      {
        id: '1',
        studentId: studentId,
        studentName: 'Marie Martin',
        subjectId: '1',
        subjectName: 'Mathématiques',
        classId: '1',
        evaluationType: 'DS',
        score: 16,
        maxScore: 20,
        coefficient: 5,
        term: 'Trimestre 1',
        academicYear: '2024-2025',
        teacherId: '2',
        status: 'VALIDATED',
        validatedAt: new Date(),
        validatedBy: 'Admin'
      },
      {
        id: '2',
        studentId: studentId,
        studentName: 'Marie Martin',
        subjectId: '2',
        subjectName: 'Physique',
        classId: '1',
        evaluationType: 'COMPOSITION',
        score: 14.5,
        maxScore: 20,
        coefficient: 4,
        term: 'Trimestre 1',
        academicYear: '2024-2025',
        teacherId: '2',
        status: 'VALIDATED',
        validatedAt: new Date()
      },
      {
        id: '3',
        studentId: studentId,
        studentName: 'Marie Martin',
        subjectId: '3',
        subjectName: 'Français',
        classId: '1',
        evaluationType: 'INTERROGATION',
        score: 17,
        maxScore: 20,
        coefficient: 4,
        term: 'Trimestre 1',
        academicYear: '2024-2025',
        teacherId: '3',
        status: 'VALIDATED',
        validatedAt: new Date()
      }
    ];

    return of(grades).pipe(delay(500));
  }

  /**
   * Données pour graphiques
   */
  getPerformanceData(): Observable<any> {
    const data = {
      labels: ['Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév'],
      datasets: [
        {
          label: 'Taux de réussite',
          data: [75, 78, 80, 77, 82, 85],
          borderColor: '#4F46E5',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4
        }
      ]
    };

    return of(data).pipe(delay(300));
  }
}