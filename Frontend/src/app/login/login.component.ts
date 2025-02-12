import { Component, inject } from '@angular/core';
import { AuthentificationService } from '../services/authentificationService/authentification.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });
  constructor(private authService: AuthentificationService) {}

  onLogin() {
    if (this.loginForm.valid) {
      if (this.loginForm.value.email && this.loginForm.value.password) {
        this.authService.authenticate(
          this.loginForm.value.email,
          this.loginForm.value.password
        );
      }
    }
  }
}
