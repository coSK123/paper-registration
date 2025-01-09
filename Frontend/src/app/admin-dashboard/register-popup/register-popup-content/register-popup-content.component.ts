import { MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';


@Component({
  selector: 'app-register-popup-content',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './register-popup-content.component.html',
  styleUrl: './register-popup-content.component.scss'
})
export class RegisterPopupContentComponent {

}
