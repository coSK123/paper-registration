import { Component } from '@angular/core';
import { RegisterPopupComponent } from './register-popup/register-popup.component';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RegisterPopupComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
