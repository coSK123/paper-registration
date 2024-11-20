import { Component } from '@angular/core';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FrontpageComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'Frontend';

  constructor() {
    
  }
}
