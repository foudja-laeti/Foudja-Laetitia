// src/app/layouts/student-layout/student-layout.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './student-layout.html',
  styleUrls: ['./student-layout.css']
})
export class StudentLayoutComponent implements OnInit {
  sidebarCollapsed = false;
  currentRoute = 'dashboard';
  studentName = '';
  pendingRequests = 0;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer le nom de l'étudiant
    const currentUser = this.authService.getCurrentUser();
    this.studentName = currentUser 
      ? `${currentUser.firstName} ${currentUser.lastName}` 
      : 'Étudiant';

    // Charger les compteurs
    this.loadCounters();

    // Détecter les changements de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateCurrentRoute(event.url);
      });

    // Route initiale
    this.updateCurrentRoute(this.router.url);
  }

  private updateCurrentRoute(url: string): void {
    if (url.includes('/dashboard')) {
      this.currentRoute = 'dashboard';
    } else if (url.includes('/grades')) {
      this.currentRoute = 'grades';
    } else if (url.includes('/bulletin')) {
      this.currentRoute = 'bulletin';
    } else if (url.includes('/courses')) {
      this.currentRoute = 'courses';
    } else if (url.includes('/requests')) {
      this.currentRoute = 'requests';
    } else if (url.includes('/profile')) {
      this.currentRoute = 'profile';
    } else {
      this.currentRoute = 'dashboard';
    }
  }

  private loadCounters(): void {
    // Simuler le chargement des compteurs
    // TODO: Remplacer par des appels API réels
    this.pendingRequests = 0;
  }

  getInitials(): string {
    const names = this.studentName.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return names[0]?.[0] || 'ET';
  }

  getPageTitle(): string {
    const titles: { [key: string]: string } = {
      'dashboard': 'Tableau de Bord',
      'grades': 'Mes Notes',
      'bulletin': 'Mon Bulletin',
      'courses': 'Mes Unités d\'Enseignement',
      'requests': 'Mes Requêtes',
      'profile': 'Mon Profil'
    };
    return titles[this.currentRoute] || 'EduNotes';
  }

  getPageSubtitle(): string {
    const subtitles: { [key: string]: string } = {
      'dashboard': 'Vue d\'ensemble de vos performances académiques',
      'grades': 'Consultez vos notes par matière et par semestre',
      'bulletin': 'Votre relevé de notes officiel',
      'courses': 'Liste de vos unités d\'enseignement',
      'requests': 'Gérez vos demandes de correction',
      'profile': 'Informations personnelles et paramètres'
    };
    return subtitles[this.currentRoute] || '';
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  // Actions du header
  downloadBulletin(): void {
    console.log('Téléchargement du bulletin...');
    // TODO: Implémenter la logique de téléchargement
  }

  exportGrades(): void {
    console.log('Export des notes...');
    // TODO: Implémenter la logique d'export
  }

  printBulletin(): void {
    window.print();
  }

  newRequest(): void {
    this.router.navigate(['/student/requests/new']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}