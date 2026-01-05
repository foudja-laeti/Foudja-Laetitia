// teacher-layout.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from "../../core/services/auth.service";

@Component({
  selector: 'app-teacher-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './teacher-layout.component.html',
  styleUrls: ['./teacher-layout.css']
})
export class TeacherLayoutComponent implements OnInit {
  teacherName = '';
  currentRoute = 'dashboard';
  sidebarCollapsed = false;
  pendingGrades = 0;
  pendingRequests = 0;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupérer le nom de l'enseignant
    const currentUser = this.authService.getCurrentUser();
    this.teacherName = currentUser 
      ? `${currentUser.firstName} ${currentUser.lastName}` 
      : 'Enseignant';

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
    } else if (url.includes('/classes')) {
      this.currentRoute = 'classes';
    } else if (url.includes('/students')) {
      this.currentRoute = 'students';
    } else if (url.includes('/statistics')) {
      this.currentRoute = 'statistics';
    } else if (url.includes('/requests')) {
      this.currentRoute = 'requests';
    } else if (url.includes('/bulletins')) {
      this.currentRoute = 'bulletins';
    } else {
      this.currentRoute = 'dashboard';
    }
  }

  private loadCounters(): void {
    // Simuler le chargement des compteurs
    // TODO: Remplacer par des appels API réels
    this.pendingGrades = 24;
    this.pendingRequests = 8;
  }

  getInitials(): string {
    const names = this.teacherName.split(' ');
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    }
    return names[0]?.[0] || 'E';
  }

  getPageTitle(): string {
    const titles: { [key: string]: string } = {
      'dashboard': 'Tableau de Bord',
      'grades': 'Gestion des Notes',
      'classes': 'Mes Classes',
      'students': 'Liste des Étudiants',
      'statistics': 'Statistiques',
      'requests': 'Requêtes Étudiantes',
      'bulletins': 'Bulletins'
    };
    return titles[this.currentRoute] || 'Dashboard Enseignant';
  }

  getPageSubtitle(): string {
    const subtitles: { [key: string]: string } = {
      'dashboard': 'Vue d\'ensemble de vos activités',
      'grades': 'Saisissez et gérez les notes de vos étudiants',
      'classes': 'Consultez vos classes et UE assignées',
      'students': 'Informations sur vos étudiants',
      'statistics': 'Analyses et performances',
      'requests': 'Demandes de révision de notes',
      'bulletins': 'Relevés de notes et bulletins'
    };
    return subtitles[this.currentRoute] || 'Bienvenue';
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  // Actions du header
  exportData(): void {
    console.log('Export des données du dashboard');
    // TODO: Implémenter la logique d'export
  }

  quickGradeEntry(): void {
    this.router.navigate(['/teacher/grades/entry']);
  }

  importExcel(): void {
    this.router.navigate(['/teacher/grades/import']);
  }

  validateGrades(): void {
    this.router.navigate(['/teacher/grades/validate']);
  }

  exportClasses(): void {
    console.log('Export des classes');
    // TODO: Implémenter la logique d'export
  }

  exportStatistics(): void {
    console.log('Export des statistiques');
    // TODO: Implémenter la logique d'export PDF
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}