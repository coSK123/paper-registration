import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../current-user/current-user.service';
import { RoutingService } from '../routing-service/routing.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.currentUserService.isAdmin()) {
      return true;
    }
    this.router.navigate([this.router.url]);
    return false;
  }
}