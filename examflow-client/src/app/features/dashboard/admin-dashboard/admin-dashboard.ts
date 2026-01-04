// admin-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

interface Activity {
  id: string;
  title: string;
  user: string;
  time: string;
  icon: string;
  color: string;
}

interface Stats {
  totalStudents: number;
  totalTeachers: number;
  totalClasses: number;
  totalSubjects: number;
  pendingGrades: number;
  validatedGrades: number;
  successRate: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: Stats = {
    totalStudents: 1248,
    totalTeachers: 87,
    totalClasses: 42,
    totalSubjects: 156,
    pendingGrades: 124,
    validatedGrades: 856,
    successRate: 87.3
  };

  recentActivities: Activity[] = [
    {
      id: '1',
      title: 'Nouvel étudiant inscrit',
      user: 'Marie Dubois',
      time: 'Il y a 5 minutes',
      icon: 'user-plus',
      color: 'blue'
    },
    {
      id: '2',
      title: 'Notes de mathématiques validées',
      user: 'Jean Dupont',
      time: 'Il y a 15 minutes',
      icon: 'check-circle',
      color: 'green'
    },
    {
      id: '3',
      title: 'Nouveau cours créé',
      user: 'Sophie Martin',
      time: 'Il y a 30 minutes',
      icon: 'book',
      color: 'blue'
    },
    {
      id: '4',
      title: 'Bulletin généré',
      user: 'Admin System',
      time: 'Il y a 1 heure',
      icon: 'file-alt',
      color: 'orange'
    }
  ];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Charger les données
  }

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get userName() {
    return this.currentUser ? `${this.currentUser.firstName} ${this.currentUser.lastName}` : 'Admin';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getProgressPercentage(): number {
    const total = this.stats.validatedGrades + this.stats.pendingGrades;
    return Math.round((this.stats.validatedGrades / total) * 100);
  }
}