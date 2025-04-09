import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CurrentUserService } from '../../services/current-user/current-user.service';
import { LogoutService } from '../../services/logout/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink
  ]
})
export class NavbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  isProfessor = false;
  isAdmin = false;
  isStudent = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private currentUserService: CurrentUserService,
    private logoutService: LogoutService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.currentUserService.getUser();
    if (user) {
      this.isProfessor = user.role === 'Dozent';
      this.isAdmin = user.role === 'Administrator';
      this.isStudent = user.role === 'Student';
    }
  }

  logout(): void {
    this.logoutService.logout();
    this.router.navigate(['/login']);
  }
}
