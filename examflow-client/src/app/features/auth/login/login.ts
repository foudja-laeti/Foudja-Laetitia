// src/app/features/auth/login/login.ts - ANTI-CRASH
// src/app/features/auth/login/login.ts - IMPORT MANQUANT
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';  // ✅ FormGroup ICI
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit {
  loginForm: FormGroup | null = null;  // ✅ NULLABLE
  loading = false;
  error = '';
  showPassword = false;

  testAccounts = [
    { email: 'admin@school.com', password: 'admin123', role: 'ADMIN' },
    { email: 'teacher@school.com', password: 'teacher123', role: 'ENSEIGNANT' },
    { email: 'student@school.com', password: 'student123', role: 'ETUDIANT' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // ✅ CHECK AUTH D'ABORD
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.authService.getDashboardRoute()]);
      return;
    }

    // ✅ ENSUITE init form
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
          this.router.navigate(['/dashboard/student']);
        } else {
          this.router.navigate(['/dashboard/teacher']);
        }
      },
      error: (err: any) => {
        this.loading = false;
        this.error = err.error?.message || 'Erreur de connexion';
      }
    });
  }

  useTestAccount(account: any): void {
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

  // ✅ SAFE GETTERS
  get f() {
    return this.loginForm?.controls || {};
  }

  isFieldInvalid(fieldName: string): boolean {
    if (!this.loginForm) return false;  // ✅ SAFE CHECK
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}
