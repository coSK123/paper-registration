import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RegisterNewUserComponent } from './register-new-user/register-new-user.component';


@Component({
  standalone: true,
  selector: 'register-popup',
  templateUrl: 'register-popup.component.html',
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPopupComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(RegisterNewUserComponent);
  }
}

