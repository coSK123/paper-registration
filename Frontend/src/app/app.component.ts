import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './sharedComponents/header/header.component';
import { CurrentUserService } from './services/current-user/current-user.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Frontend';

  isLoggedIn = false;

  constructor(private currentUser: CurrentUserService, private cdr: ChangeDetectorRef) {
    this.isLoggedIn = this.currentUser.isUserLoggedIn();

    // Subscribe to login status changes
    this.currentUser.loginStatusChanged.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      this.cdr.detectChanges(); // Trigger change detection
    });
  }
}
