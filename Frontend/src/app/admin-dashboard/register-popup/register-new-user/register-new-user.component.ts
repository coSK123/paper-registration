import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RegisterService, User } from '../../../services/registerService/register.service';


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

    firstname: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, Validators.required],
    password: [null, Validators.required],
    role: [null, Validators.required],
  });

  constructor(private dialogRef: MatDialogRef<RegisterNewUserComponent>, private registrationService: RegisterService) {}

  onSubmit(): void {
    if (this.addressForm.valid) {
      if(this.addressForm.value.firstname && this .addressForm.value.lastname && this.addressForm.value.email && this.addressForm.value.password && this.addressForm.value.role){
       const newUser:  User = {firstname: this.addressForm.value.firstname, lastname: this.addressForm.value.lastname, email: this.addressForm.value.email, password: this.addressForm.value.password, role: this.addressForm.value.role};
       this.registrationService.register(newUser);
       this.dialogRef.close();
      }
    } else {
      // Show errors or prevent closing
    }
  }
}
