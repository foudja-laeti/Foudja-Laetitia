// src/app/layouts/main-layout/main-layout.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { User, UserRole } from '../../core/models/user.model';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
  roles: UserRole[];
}

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css']
})
export class MainLayout implements OnInit {
  sidebarOpen = true;
  currentUser: User | null = null;
  menuItems: MenuItem[] = [];

  private allMenuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      route: '/dashboard/admin',
      icon: 'home',
      roles: [UserRole.ADMIN, UserRole.PROVISEUR]
    },
    {
      label: 'Dashboard',
      route: '/dashboard/teacher',
      icon: 'home',
      roles: [UserRole.ENSEIGNANT, UserRole.SURVEILLANT]
    },
    {
      label: 'Dashboard',
      route: '/dashboard/student',
      icon: 'home',
      roles: [UserRole.ETUDIANT]
    },
    {
      label: 'Utilisateurs',
      route: '/users',
      icon: 'users',
      roles: [UserRole.ADMIN, UserRole.PROVISEUR]
    },
    {
      label: 'Classes',
      route: '/classes',
      icon: 'door-open',
      roles: [UserRole.ADMIN, UserRole.PROVISEUR, UserRole.ENSEIGNANT]
    },
    {
      label: 'Matières',
      route: '/subjects',
      icon: 'book',
      roles: [UserRole.ADMIN, UserRole.PROVISEUR]
    },
    {
      label: 'Notes',
      route: '/grades',
      icon: 'clipboard-list',
      roles: [UserRole.ADMIN, UserRole.PROVISEUR, UserRole.ENSEIGNANT, UserRole.ETUDIANT]
    },
    {
      label: 'Bulletins',
      route: '/reports',
      icon: 'file-alt',
      roles: [UserRole.ADMIN, UserRole.PROVISEUR, UserRole.ENSEIGNANT, UserRole.ETUDIANT]
    },
    {
      label: 'Statistiques',
      route: '/statistics',
      icon: 'chart-bar',
      roles: [UserRole.ADMIN, UserRole.PROVISEUR]
    },
    {
      label: 'Paramètres',
      route: '/settings',
      icon: 'cog',
      roles: [UserRole.ADMIN, UserRole.PROVISEUR]
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.loadMenuItems();
    });
  }

  loadMenuItems(): void {
    if (!this.currentUser) {
      this.menuItems = [];
      return;
    }

    // Filtrer les items selon le rôle de l'utilisateur
    this.menuItems = this.allMenuItems.filter(item =>
      item.roles.includes(this.currentUser!.role)
    );
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      this.authService.logout();
      window.location.href = '/auth/login';
    }
  }
}