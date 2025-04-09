import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CurrentUserService } from '../services/current-user/current-user.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {
  userName: string = '';

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    const user = this.currentUserService.getUser();
    if (user) {
      this.userName = user.email.split('@')[0]; // Get the part before @ for a friendly display
    }
  }
} 