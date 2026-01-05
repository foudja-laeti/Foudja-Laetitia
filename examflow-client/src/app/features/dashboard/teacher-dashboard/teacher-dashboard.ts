// src/app/features/dashboard/teacher/teacher-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

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
  pendingRequests: number;
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
        pendingRequests: 8,
        recentActivities: [
          {
            id: '1',
            description: 'Notes de Mathématiques validées pour L2 Info',
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
            description: 'UE Algorithmique - Moyenne en hausse',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
            icon: 'chart-line',
            color: 'success'
          },
          {
            id: '5',
            description: 'Nouvelle requête étudiant pour révision de note',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
            icon: 'question-circle',
            color: 'warning'
          }
        ]
      };

      this.subjects = [
        {
          id: '1',
          name: 'Algorithmique et Structures de Données',
          code: 'INF-301',
          coefficient: 4
        },
        {
          id: '2',
          name: 'Bases de Données Relationnelles',
          code: 'INF-302',
          coefficient: 3
        },
        {
          id: '3',
          name: 'Programmation Orientée Objet',
          code: 'INF-303',
          coefficient: 3
        }
      ];

      this.classes = [
        {
          id: '1',
          name: 'Algorithmique L2 Info',
          level: 'Licence 2',
          department: 'Informatique',
          studentCount: 45
        },
        {
          id: '2',
          name: 'Base de Données L2 Info',
          level: 'Licence 2',
          department: 'Informatique',
          studentCount: 48
        },
        {
          id: '3',
          name: 'POO L2 Info',
          level: 'Licence 2',
          department: 'Informatique',
          studentCount: 42
        },
        {
          id: '4',
          name: 'Algorithmique L2 Math-Info',
          level: 'Licence 2',
          department: 'Mathématiques-Informatique',
          studentCount: 35
        },
        {
          id: '5',
          name: 'Base de Données L3 Info',
          level: 'Licence 3',
          department: 'Informatique',
          studentCount: 38
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

  // Méthodes pour les actions
  openGradeEntry(subject: Subject): void {
    console.log('Ouverture saisie notes pour:', subject.name);
    // Navigation vers la page de saisie de notes
    // this.router.navigate(['/teacher/grades/entry', subject.id]);
  }

  viewStatistics(classRoom: ClassRoom): void {
    console.log('Affichage statistiques pour:', classRoom.name);
    // Navigation vers les statistiques
    // this.router.navigate(['/teacher/statistics', classRoom.id]);
  }

  viewStudents(classRoom: ClassRoom): void {
    console.log('Affichage étudiants pour:', classRoom.name);
    // Navigation vers la liste des étudiants
    // this.router.navigate(['/teacher/students', classRoom.id]);
  }

  exportData(classRoom: ClassRoom): void {
    console.log('Export données pour:', classRoom.name);
    // Logique d'export
  }

  quickGradeEntry(): void {
    console.log('Saisie rapide de notes CC');
    // Navigation vers saisie rapide
    // this.router.navigate(['/teacher/grades/quick-entry']);
  }

  importExcel(): void {
    console.log('Import Excel');
    // Ouvrir le dialogue d'import Excel
    // this.router.navigate(['/teacher/grades/import']);
  }

  validateGrades(): void {
    console.log('Validation des notes');
    // Navigation vers validation
    // this.router.navigate(['/teacher/grades/validate']);
  }

  viewRequests(): void {
    console.log('Affichage des requêtes étudiantes');
    // Navigation vers les requêtes
    // this.router.navigate(['/teacher/requests']);
  }
}