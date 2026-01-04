// src/app/features/dashboard/admin/admin-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, ChartData, registerables } from 'chart.js';

// Enregistrer tous les composants Chart.js
Chart.register(...registerables);

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  validatedGrades: number;
  pendingGrades: number;
  averageSuccess: number;
  recentActivities: Activity[];
}

interface Activity {
  id: string;
  description: string;
  user: string;
  timestamp: Date;
  icon: string;
  color: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  loading = true;
  stats: DashboardStats | null = null;
  chartData: ChartData<'line'> | null = null;
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Simuler le chargement des données
    setTimeout(() => {
      this.stats = {
        totalStudents: 1248,
        totalTeachers: 87,
        totalClasses: 42,
        totalSubjects: 28,
        validatedGrades: 856,
        pendingGrades: 124,
        averageSuccess: 78,
        recentActivities: [
          {
            id: '1',
            description: 'Nouvelle inscription d\'étudiant',
            user: 'Marie Dubois',
            timestamp: new Date(Date.now() - 1000 * 60 * 5),
            icon: 'user-plus',
            color: 'primary'
          },
          {
            id: '2',
            description: 'Notes de mathématiques validées',
            user: 'Jean Dupont',
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            icon: 'check-circle',
            color: 'success'
          },
          {
            id: '3',
            description: 'Nouveau cours créé',
            user: 'Sophie Martin',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            icon: 'book',
            color: 'info'
          },
          {
            id: '4',
            description: 'Bulletin généré',
            user: 'Admin System',
            timestamp: new Date(Date.now() - 1000 * 60 * 60),
            icon: 'file-pdf',
            color: 'warning'
          },
          {
            id: '5',
            description: 'Paramètres mis à jour',
            user: 'Admin System',
            timestamp: new Date(Date.now() - 1000 * 60 * 120),
            icon: 'cog',
            color: 'secondary'
          }
        ]
      };

      this.chartData = {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Taux de réussite',
            data: [75, 78, 76, 80, 79, 82],
            borderColor: '#4F46E5',
            backgroundColor: 'rgba(79, 70, 229, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Taux de présence',
            data: [85, 87, 86, 88, 89, 90],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      };

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

  getProgressPercentage(): number {
    if (!this.stats) return 0;
    const total = (this.stats.validatedGrades || 0) + (this.stats.pendingGrades || 0);
    if (total === 0) return 0;
    return Math.round(((this.stats.validatedGrades || 0) / total) * 100);
  }
}