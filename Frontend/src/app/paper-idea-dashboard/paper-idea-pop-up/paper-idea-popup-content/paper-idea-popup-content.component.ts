import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RegisterNewUserComponent } from '../../../admin-dashboard/register-popup/register-new-user/register-new-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  standalone: true,
  selector: 'app-paper-idea-popup-content',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './paper-idea-popup-content.component.html',
  styleUrl: './paper-idea-popup-content.component.scss',
})
export class PaperIdeaPopupContentComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    groupsize: [null, Validators.required],
  });

  constructor(private dialogRef: MatDialogRef<RegisterNewUserComponent>) {}

  onSubmit(): void {
    if (this.addressForm.valid) {
      if (
        this.addressForm.value.title &&
        this.addressForm.value.description &&
        this.addressForm.value.groupsize
      ) {
        this.dialogRef.close();
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
