// admin-layout.component.ts - AVEC BOUTON DÉCONNEXION
import { Component, inject } from "@angular/core";
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { CommonModule } from '@angular/common';
import { UserRole } from "../../core/models/user.model";

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  // État du sous-menu
  isStructureMenuOpen = false;
  
  get user() {
    return this.authService.getCurrentUser();
  }
  
  get userName() {
    return this.user ? `${this.user.firstName} ${this.user.lastName}` : 'Admin';
  }
  
  get userRole() {
    const role = this.user?.role;
    const roles: { [key: string]: string } = {
      [UserRole.ADMIN]: 'Administrateur',
      [UserRole.PROVISEUR]: 'Proviseur',
      [UserRole.SURVEILLANT]: 'Surveillant'
    };
    return roles[role || ''] || 'Admin';
  }
  
  toggleStructureMenu(): void {
    this.isStructureMenuOpen = !this.isStructureMenuOpen;
  }
  
  logout(): void {
    if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }
  }
}