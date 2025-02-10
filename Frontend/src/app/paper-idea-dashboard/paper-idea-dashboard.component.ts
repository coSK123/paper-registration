import { Component } from '@angular/core';
import { PaperIdeaPopupComponent } from './paper-idea-pop-up/paper-idea-pop-up.component';

@Component({
  standalone: true,
  selector: 'app-paper-idea-dashboard',
  imports: [PaperIdeaPopupComponent],
  templateUrl: './paper-idea-dashboard.component.html',
  styleUrl: './paper-idea-dashboard.component.scss',
})
export class PaperIdeaDashboardComponent {}
