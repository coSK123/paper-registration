import { Component } from '@angular/core';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './sharedComponents/header/header.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'Frontend';

  constructor() {

  }
}
