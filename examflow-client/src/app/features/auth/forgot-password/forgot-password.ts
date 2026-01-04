// src/app/features/auth/forgot-password/forgot-password.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrls: ['./forgot-password.scss']
})
export class ForgotPassword implements OnInit {
  forgotPasswordForm!: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.get('email')?.markAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const email = this.forgotPasswordForm.value.email;

    // Simuler l'envoi d'email (pas de vraie fonction dans le service)
    setTimeout(() => {
      this.loading = false;
      this.success = 'Un email de réinitialisation a été envoyé à ' + email;
      this.forgotPasswordForm.reset();
    }, 1000);
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
}