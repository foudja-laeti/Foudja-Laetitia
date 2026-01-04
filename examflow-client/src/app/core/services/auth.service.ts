import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AuthResponse, LoginCredentials, UserRole } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  private mockUsers = [
    {
      id: '1', email: 'admin@school.com', password: 'admin123',
      firstName: 'Admin', lastName: 'System', role: UserRole.ADMIN,
      avatar: 'https://ui-avatars.com/api/?name=Admin+System&background=4F46E5&color=fff',
      department: 'Administration', createdAt: new Date(), lastLogin: new Date()
    },
    {
      id: '2', email: 'teacher@school.com', password: 'teacher123',
      firstName: 'Jean', lastName: 'Dupont', role: UserRole.ENSEIGNANT,
      avatar: 'https://ui-avatars.com/api/?name=Jean+Dupont&background=10B981&color=fff',
      department: 'Mathématiques', createdAt: new Date(), lastLogin: new Date()
    },
    {
      id: '3', email: 'student@school.com', password: 'student123',
      firstName: 'Marie', lastName: 'Martin', role: UserRole.ETUDIANT,
      avatar: 'https://ui-avatars.com/api/?name=Marie+Martin&background=F59E0B&color=fff',
      department: 'Terminale S', createdAt: new Date(), lastLogin: new Date()
    }
  ];

  constructor() {
    const storedUser = localStorage.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // ✅ login() CORRIGÉ - PLUS D'ERREUR TYPES
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return new Observable<AuthResponse>(observer => {
      setTimeout(() => {
        const user = this.mockUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          observer.error(new Error('Email ou mot de passe incorrect'));
          return;
        }

        const { password, ...userWithoutPassword } = user;
        const token = this.generateMockToken();
        
        const authResponse: AuthResponse = {
          user: userWithoutPassword as User,
          token: token
        };

        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(authResponse.user));
        this.currentUserSubject.next(authResponse.user);
        
        observer.next(authResponse);
        observer.complete();
      }, 1500);
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasRole(roles: UserRole[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }

  getDashboardRoute(): string {
    const user = this.getCurrentUser();
    if (!user) return '/auth/login';

    switch (user.role) {
      case UserRole.ADMIN:
      case UserRole.PROVISEUR:
        return '/admin';  // ✅ Sidebar Admin
      case UserRole.ENSEIGNANT:
      case UserRole.SURVEILLANT:
        return '/dashboard/teacher';
      case UserRole.ETUDIANT:
        return '/dashboard/student';
      default:
        return '/auth/login';
    }
  }

  private generateMockToken(): string {
    return 'mock_token_' + Math.random().toString(36).substr(2, 9);
  }
}
