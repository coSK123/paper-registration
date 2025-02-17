import { Component } from '@angular/core';
import { RegisterPopupComponent } from './register-popup/register-popup.component';
import { RegisteredUsersComponent } from './registered-users/registered-users.component';
import { ActiveSemesterComponent } from './active-semester/active-semester.component';



@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RegisterPopupComponent, RegisteredUsersComponent, ActiveSemesterComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
