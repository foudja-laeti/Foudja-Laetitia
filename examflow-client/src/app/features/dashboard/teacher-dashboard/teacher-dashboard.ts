// src/app/features/dashboard/teacher/teacher-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

interface Activity {
  id: string;
  description: string;
  timestamp: Date;
  icon: string;
  color: string;
}

interface TeacherStats {
  totalSubjects: number;
  totalClasses: number;
  pendingGrades: number;
  validatedGrades: number;
  averageSuccess: number;
  recentActivities: Activity[];
}

interface Subject {
  id: string;
  name: string;
  code: string;
  coefficient: number;
}

interface ClassRoom {
  id: string;
  name: string;
  level: string;
  department: string;
  studentCount: number;
}

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher-dashboard.html',
  styleUrls: ['./teacher-dashboard.css']
})
export class TeacherDashboard implements OnInit {
  loading = true;
  teacherName = '';
  stats: TeacherStats | null = null;
  subjects: Subject[] = [];
  classes: ClassRoom[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadTeacherData();
  }

  loadTeacherData(): void {
    // Récupérer le nom de l'enseignant
    const currentUser = this.authService.getCurrentUser();
    this.teacherName = currentUser 
      ? `${currentUser.firstName} ${currentUser.lastName}` 
      : 'Enseignant';

    // Simuler le chargement des données
    setTimeout(() => {
      this.stats = {
        totalSubjects: 3,
        totalClasses: 5,
        pendingGrades: 24,
        validatedGrades: 156,
        averageSuccess: 13.8,
        recentActivities: [
          {
            id: '1',
            description: 'Notes de Mathématiques validées pour 2nde A',
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            icon: 'check-circle',
            color: 'success'
          },
          {
            id: '2',
            description: 'Nouveau devoir créé en Physique',
            timestamp: new Date(Date.now() - 1000 * 60 * 60),
            icon: 'plus-circle',
            color: 'primary'
          },
          {
            id: '3',
            description: 'Import Excel réussi - 30 notes ajoutées',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
            icon: 'file-import',
            color: 'info'
          },
          {
            id: '4',
            description: 'Classe 1ère S - Moyenne en hausse',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
            icon: 'chart-line',
            color: 'success'
          },
          {
            id: '5',
            description: 'Rappel: Notes à valider avant le 25/01',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
            icon: 'exclamation-triangle',
            color: 'warning'
          }
        ]
      };

      this.subjects = [
        {
          id: '1',
          name: 'Mathématiques',
          code: 'MATH-101',
          coefficient: 4
        },
        {
          id: '2',
          name: 'Physique-Chimie',
          code: 'PHY-201',
          coefficient: 3
        },
        {
          id: '3',
          name: 'Sciences de l\'Ingénieur',
          code: 'SI-301',
          coefficient: 3
        }
      ];

      this.classes = [
        {
          id: '1',
          name: '2nde A',
          level: 'Seconde',
          department: 'Scientifique',
          studentCount: 35
        },
        {
          id: '2',
          name: '2nde B',
          level: 'Seconde',
          department: 'Scientifique',
          studentCount: 32
        },
        {
          id: '3',
          name: '1ère S1',
          level: 'Première',
          department: 'Scientifique',
          studentCount: 28
        },
        {
          id: '4',
          name: '1ère S2',
          level: 'Première',
          department: 'Scientifique',
          studentCount: 30
        },
        {
          id: '5',
          name: 'Terminale S',
          level: 'Terminale',
          department: 'Scientifique',
          studentCount: 25
        }
      ];

      this.loading = false;
    }, 1000);
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    } else if (hours > 0) {
      return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else {
      return 'À l\'instant';
    }
  }
}