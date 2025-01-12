import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthentificationService } from '../services/authentificationService/authentification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
   password: string = '';
   email: string = '';
 constructor(private authService: AuthentificationService) {

 }

 onLogin() {
    this.authService.authenticate(this.email, this.password);
 }
}
