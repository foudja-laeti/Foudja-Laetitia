// src/app/features/auth/login/login.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  loginForm!: FormGroup;
  loading = false;
  error = '';
  showPassword = false;

  testAccounts = [
    { email: 'admin@school.com', password: 'admin123', role: 'Administrateur' },
    { email: 'teacher@school.com', password: 'teacher123', role: 'Enseignant' },
    { email: 'student@school.com', password: 'student123', role: 'Étudiant' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.authService.getDashboardRoute()]);
      return;
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.loading = true;
    this.error = '';

    // CORRECTION ICI : passer l'objet complet du formulaire
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loading = false;
        const dashboardRoute = this.authService.getDashboardRoute();
        this.router.navigate([dashboardRoute]);
      },
      error: (err: Error) => {
        this.loading = false;
        this.error = err.message || 'Une erreur est survenue';
      }
    });
  }

  useTestAccount(account: any): void {
    this.loginForm.patchValue({
      email: account.email,
      password: account.password
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      formGroup.get(key)?.markAsTouched();
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}