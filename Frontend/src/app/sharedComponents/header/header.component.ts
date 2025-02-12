import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LogoutService } from '../../services/logout/logout.service';
import { RoutingService } from '../../services/routing-service/routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {


  constructor(private logoutService: LogoutService, private routingService: RoutingService, private router: Router) { }

  logout(): void {
    this.logoutService.logout();
    this.router.navigate([this.routingService.routeAfterLogout()]);
  }
}
