// src/app/shared/components/sidebar/sidebar.component.ts - VERSION FINALE
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';  // ✅ Chemin relatif correct
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,           // 🚨 OBLIGATOIRE
  imports: [CommonModule, RouterModule],  // 🚨 OBLIGATOIRE
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  isCollapsed = false;
  isSubmenuOpen = {
    structure: false
  };
  userName = '';

  constructor(private authService: AuthService, private router: Router) {
    this.userName = this.authService.getCurrentUser()?.firstName || 'Admin';
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    if (this.isCollapsed) this.isSubmenuOpen.structure = false;
  }

  toggleSubmenu(menu: string): void {
    if (menu === 'structure') {
      this.isSubmenuOpen.structure = !this.isSubmenuOpen.structure;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
