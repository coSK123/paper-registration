import { Component } from '@angular/core';
import { ButtonComponent } from './button/button.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'Frontend';

  constructor() {
    
  }
}
