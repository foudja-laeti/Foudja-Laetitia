// src/app/features/dashboard/student/student-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

interface StudentStats {
  totalSubjects: number;
  averageSuccess: number;
  recentActivities: Activity[];
}

interface Activity {
  id: string;
  description: string;
  timestamp: Date;
  icon: string;
  color: string;
}

interface Grade {
  id: string;
  subjectName: string;
  evaluationType: string;
  score: number;
  maxScore: number;
  coefficient: number;
  validatedAt: Date;
  status: 'VALIDATED' | 'PENDING';
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard.html',
  styleUrls: ['./student-dashboard.css']
})
export class StudentDashboard implements OnInit {
  loading = true;
  studentName = '';
  stats: StudentStats | null = null;
  grades: Grade[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadStudentData();
  }

  loadStudentData(): void {
    // Récupérer le nom de l'étudiant
    const currentUser = this.authService.getCurrentUser();
    this.studentName = currentUser 
      ? `${currentUser.firstName} ${currentUser.lastName}` 
      : 'Étudiant';

    // Simuler le chargement des données
    setTimeout(() => {
      this.stats = {
        totalSubjects: 12,
        averageSuccess: 14.5,
        recentActivities: [
          {
            id: '1',
            description: 'Nouvelle note en Mathématiques',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            icon: 'plus-circle',
            color: 'success'
          },
          {
            id: '2',
            description: 'Bulletin disponible',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            icon: 'file-pdf',
            color: 'primary'
          },
          {
            id: '3',
            description: 'Nouveau devoir à rendre',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
            icon: 'clipboard-list',
            color: 'warning'
          },
          {
            id: '4',
            description: 'Message du professeur',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
            icon: 'envelope',
            color: 'info'
          }
        ]
      };

      this.grades = [
        {
          id: '1',
          subjectName: 'Mathématiques',
          evaluationType: 'Devoir',
          score: 16,
          maxScore: 20,
          coefficient: 3,
          validatedAt: new Date('2024-11-15'),
          status: 'VALIDATED'
        },
        {
          id: '2',
          subjectName: 'Physique-Chimie',
          evaluationType: 'Contrôle',
          score: 14,
          maxScore: 20,
          coefficient: 2,
          validatedAt: new Date('2024-11-12'),
          status: 'VALIDATED'
        },
        {
          id: '3',
          subjectName: 'Français',
          evaluationType: 'Dissertation',
          score: 15,
          maxScore: 20,
          coefficient: 2,
          validatedAt: new Date('2024-11-10'),
          status: 'VALIDATED'
        },
        {
          id: '4',
          subjectName: 'Anglais',
          evaluationType: 'Oral',
          score: 17,
          maxScore: 20,
          coefficient: 2,
          validatedAt: new Date('2024-11-08'),
          status: 'VALIDATED'
        },
        {
          id: '5',
          subjectName: 'Histoire-Géo',
          evaluationType: 'Devoir',
          score: 13,
          maxScore: 20,
          coefficient: 2,
          validatedAt: new Date('2024-11-05'),
          status: 'VALIDATED'
        },
        {
          id: '6',
          subjectName: 'SVT',
          evaluationType: 'TP',
          score: 15.5,
          maxScore: 20,
          coefficient: 1,
          validatedAt: new Date('2024-11-03'),
          status: 'VALIDATED'
        },
        {
          id: '7',
          subjectName: 'Philosophie',
          evaluationType: 'Composition',
          score: 12,
          maxScore: 20,
          coefficient: 3,
          validatedAt: new Date('2024-11-01'),
          status: 'PENDING'
        }
      ];

      this.loading = false;
    }, 1000);
  }

  getGradeColor(score: number, maxScore: number): string {
    const percentage = (score / maxScore) * 100;
    
    if (percentage >= 80) {
      return 'excellent'; // Vert
    } else if (percentage >= 60) {
      return 'good'; // Bleu
    } else if (percentage >= 50) {
      return 'average'; // Orange
    } else {
      return 'poor'; // Rouge
    }
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

  getCircleProgress(): number {
    if (!this.stats) return 0;
    // Calcul pour le cercle SVG (251 = circonférence approximative du cercle)
    return 251 - (251 * this.stats.averageSuccess / 20);
  }
}