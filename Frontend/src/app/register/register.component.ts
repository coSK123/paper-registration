import { Component } from '@angular/core';
import { RegisterService } from '../services/registerService/register.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  password: string = '';
  username: string = '';
  constructor(private registerService: RegisterService) {

  }

  onRegister() {
    this.registerService.register(this.username, this.password);
  }
}
