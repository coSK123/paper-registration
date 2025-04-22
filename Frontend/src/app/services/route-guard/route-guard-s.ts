import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CurrentUserService } from '../current-user/current-user.service';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.currentUserService.isStudent()) {
      return true;
    }
    this.router.navigate([this.router.url]);
    return false;
  }
} 