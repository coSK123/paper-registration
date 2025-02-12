import { Injectable } from '@angular/core';
import { CurrentUserService } from '../current-user/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class RoutingService {
  constructor(private currentUserService: CurrentUserService) {}

  routeAfterLogin() {
    if (this.currentUserService.isAdmin()) {
      return '/a/dashboard';
    } else if (this.currentUserService.isProfessor()) {
      return '/d/dashboard';
    } else if (this.currentUserService.isStudent()) {
      return '/s/dashboard';
    } else {
      return '/login';
    }
  }

  routeAfterLogout() {
    return '/login';
  }
}
