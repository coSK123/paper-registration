import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './sharedComponents/header/header.component';
import { CurrentUserService } from './services/current-user/current-user.service';
import { LoginComponent } from './login/login.component';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoginComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';

  isLoggedIn$:Observable<boolean>;

  constructor(private currentUser: CurrentUserService) {
    this.isLoggedIn$ = this.currentUser.loginStatusChanged;
  }
}
