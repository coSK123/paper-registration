import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-register-new-user',
  templateUrl: './register-new-user.component.html',
  styleUrl: './register-new-user.component.scss',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
  ]
})
export class RegisterNewUserComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({

    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    role: [null, Validators.required],
  });

  constructor(private dialogRef: MatDialogRef<RegisterNewUserComponent>) {}

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      console.log('User registered');
      this.dialogRef.close();
    } else {
      // Show errors or prevent closing
    }
  }
}
