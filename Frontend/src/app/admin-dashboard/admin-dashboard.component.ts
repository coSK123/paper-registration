import { Component } from '@angular/core';
import { RegisterPopupComponent } from './register-popup/register-popup.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RegisterPopupComponent, RegisteredUsersComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
