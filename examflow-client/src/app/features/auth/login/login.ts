// src/app/features/auth/login/login.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

// Interface pour les comptes test
interface TestAccount {
  email: string;
  password: string;
  role: string;
  type: string;
  icon: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  loginForm: FormGroup | null = null;
  loading = false;
  error = '';
  showPassword = false;

  testAccounts: TestAccount[] = [
    {
      email: 'admin@school.com',
      password: 'admin123',
      role: 'Administrateur',
      type: 'admin',
      icon: 'fas fa-user-shield'
    },
    {
      email: 'teacher@school.com',
      password: 'teacher123',
      role: 'Enseignant',
      type: 'teacher',
      icon: 'fas fa-chalkboard-teacher'
    },
    {
      email: 'student@school.com',
      password: 'student123',
      role: 'Étudiant',
      type: 'student',
      icon: 'fas fa-user-graduate'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Check auth d'abord
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.authService.getDashboardRoute()]);
      return;
    }

    // Init form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (!this.loginForm || this.loginForm.invalid) {
      if (this.loginForm) this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        const userRole = this.authService.getCurrentUser()?.role;
        
        if (['ADMIN', 'PROVISEUR', 'SURVEILLANT'].includes(userRole || '')) {
          this.router.navigate(['/admin']);
        } else if (userRole === 'ETUDIANT') {
          this.router.navigate(['/student/dashboard']);
        } else {
          this.router.navigate(['/teacher/dashboard']);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error?.message || 'Erreur de connexion. Veuillez réessayer.';
      }
    });
  }

  useTestAccount(account: TestAccount): void {
    if (this.loginForm) {
      this.loginForm.patchValue({
        email: account.email,
        password: account.password
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  // Safe getters
  get f() {
    return this.loginForm?.controls || {};
  }

  isFieldInvalid(fieldName: string): boolean {
    if (!this.loginForm) return false;
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}