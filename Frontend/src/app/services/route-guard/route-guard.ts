import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../current-user/current-user.service';
import { RoutingService } from '../routing-service/routing.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private routingService: RoutingService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.currentUserService.isUserLoggedIn()) {
      const route = this.routingService.routeAfterLogin();
      this.router.navigate([route]);
      return false;
    }
    return true;
  }
}