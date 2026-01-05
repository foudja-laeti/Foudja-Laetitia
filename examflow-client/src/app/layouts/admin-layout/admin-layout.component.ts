// admin-layout.component.ts
import { Component, OnInit, inject } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { CommonModule } from '@angular/common';
import { UserRole } from "../../core/models/user.model";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // État du sous-menu et sidebar
  isStructureMenuOpen = false;
  sidebarCollapsed = false;
  currentRoute = '';
  
  ngOnInit(): void {
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
    this.currentRoute = url;
  }
  
  get user() {
    return this.authService.getCurrentUser();
  }
  
  get userName(): string {
    return this.user ? `${this.user.firstName} ${this.user.lastName}` : 'Admin';
  }
  
  get userRole(): string {
    const role = this.user?.role;
    const roles: { [key: string]: string } = {
      [UserRole.ADMIN]: 'Administrateur',
      [UserRole.PROVISEUR]: 'Proviseur',
      [UserRole.SURVEILLANT]: 'Surveillant'
    };
    return roles[role || ''] || 'Admin';
  }
  
  getInitials(): string {
    if (!this.user) return 'AD';
    
    const firstName = this.user.firstName || '';
    const lastName = this.user.lastName || '';
    
    if (firstName && lastName) {
      return (firstName[0] + lastName[0]).toUpperCase();
    }
    
    return firstName ? firstName.substring(0, 2).toUpperCase() : 'AD';
  }
  
  getPageTitle(): string {
    const titles: { [key: string]: string } = {
      '/admin': 'Dashboard',
      '/admin/departments': 'Départements',
      '/admin/programs': 'Programmes',
      '/admin/course-units': 'Unités d\'Enseignement',
      '/admin/academic-years': 'Années & Semestres',
      '/admin/users': 'Utilisateurs',
      '/admin/students': 'Étudiants',
      '/admin/teachers': 'Enseignants',
      '/admin/grades': 'Notes',
      '/admin/bulletins': 'Bulletins',
      '/admin/statistics': 'Statistiques',
      '/admin/settings': 'Paramètres'
    };
    
    // Chercher la correspondance exacte
    if (titles[this.currentRoute]) {
      return titles[this.currentRoute];
    }
    
    // Chercher une correspondance partielle
    for (const [route, title] of Object.entries(titles)) {
      if (this.currentRoute.includes(route)) {
        return title;
      }
    }
    
    return 'Administration';
  }
  
  isStructureActive(): boolean {
    return this.currentRoute.includes('/admin/departments') ||
           this.currentRoute.includes('/admin/programs') ||
           this.currentRoute.includes('/admin/course-units');
  }
  
  toggleStructureMenu(): void {
    this.isStructureMenuOpen = !this.isStructureMenuOpen;
  }
  
  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  
  logout(): void {
    if (confirm('Voulez-vous vraiment vous déconnexter ?')) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }
  }
}