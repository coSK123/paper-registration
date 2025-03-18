import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaperIdeasService, PaperIdea } from '../services/paper-ideas-service/paper-ideas.service';
import { CurrentUserService } from '../services/current-user/current-user.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-professor-paper-ideas',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatChipsModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule,
    MatDividerModule,
    RouterLink
  ],
  templateUrl: './professor-paper-ideas.component.html',
  styleUrls: ['./professor-paper-ideas.component.scss']
})
export class ProfessorPaperIdeasComponent implements OnInit {
  paperIdeas: PaperIdea[] = [];
  loading = true;
  error: string | null = null;
  
  constructor(
    private paperIdeasService: PaperIdeasService,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    console.log('Professor Paper Ideas Component initialized');
    const currentUser = this.currentUserService.getUser();
    console.log('Current user:', currentUser);
    this.loadPaperIdeas();
  }
  
  loadPaperIdeas(): void {
    this.loading = true;
    this.error = null;
    console.log('Loading paper ideas...');
    
    this.paperIdeasService.getProfessorPaperIdeas().subscribe({
      next: (ideas) => {
        console.log('Paper ideas loaded successfully:', ideas);
        this.paperIdeas = ideas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading paper ideas:', err);
        this.error = 'Failed to load your paper ideas. Please try again later.';
        this.loading = false;
      },
      complete: () => {
        console.log('Paper ideas request completed');
      }
    });
  }

  goToDetails(id: number): void {
    console.log('Navigating to paper idea details:', id);
    this.router.navigate(['/paper-idea', id]);
  }
} 