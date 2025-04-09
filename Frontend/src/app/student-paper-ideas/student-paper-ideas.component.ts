import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { PaperIdeasService, PaperIdea, PaperIdeaFilters } from '../services/paper-ideas-service/paper-ideas.service';
import { CurrentUserService } from '../services/current-user/current-user.service';
import { ActiveSemesterService } from '../services/active-semester/active-semester.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterLink } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface KeyPoint {
  id: number;
  description: string;
}

@Component({
  selector: 'app-student-paper-ideas',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    MatCardModule, 
    MatChipsModule, 
    MatIconModule, 
    MatButtonModule, 
    MatTooltipModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    RouterLink
  ],
  templateUrl: './student-paper-ideas.component.html',
  styleUrls: ['./student-paper-ideas.component.scss']
})
export class StudentPaperIdeasComponent implements OnInit {
  paperIdeas: PaperIdea[] = [];
  loading = true;
  error: string | null = null;
  filterForm: FormGroup;
  activeSemesterId: number | null = null;
  allKeyPoints: KeyPoint[] = [];
  searchSubject = new Subject<string>();
  
  constructor(
    private paperIdeasService: PaperIdeasService,
    private currentUserService: CurrentUserService,
    private activeSemesterService: ActiveSemesterService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      titleSearch: [''],
      keyPointIds: [[]]
    });
  }
  
  ngOnInit(): void {
    console.log('Student Paper Ideas Component initialized');
    this.loadActiveSemester();
    this.loadKeyPoints();
    this.setupSearchSubscription();
  }
  
  loadActiveSemester(): void {
    this.activeSemesterService.getAllSemesters().subscribe({
      next: (semesters: any[]) => {
        // Find the active semester
        const activeSemester = semesters.find(s => s.active);
        
        if (activeSemester) {
          // Map the semester to include id (assuming the index + 1 is the id)
          const semesterIndex = semesters.indexOf(activeSemester);
          this.activeSemesterId = semesterIndex + 1;
          
          // Load paper ideas for the active semester
          this.loadPaperIdeas();
        } else {
          this.error = 'No active semester found. Please contact an administrator.';
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error loading active semester:', err);
        this.error = 'Failed to load active semester. Please try again later.';
        this.loading = false;
      }
    });
  }
  
  loadKeyPoints(): void {
    this.http.get<KeyPoint[]>(`${environment.apiUrl}/keypoints`).subscribe({
      next: (keyPoints) => {
        this.allKeyPoints = keyPoints;
        console.log('Key points loaded:', keyPoints);
      },
      error: (err) => {
        console.error('Error loading key points:', err);
      }
    });
  }
  
  setupSearchSubscription(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => {
        this.loading = true;
        return this.paperIdeasService.getAllPaperIdeas(this.getFilters());
      })
    ).subscribe({
      next: (ideas) => {
        this.paperIdeas = ideas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error searching paper ideas:', err);
        this.error = 'Failed to search paper ideas. Please try again later.';
        this.loading = false;
      }
    });
  }
  
  onSearchChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }
  
  isKeyPointSelected(keyPointId: number): boolean {
    const selectedKeyPoints = this.filterForm.get('keyPointIds')?.value || [];
    return selectedKeyPoints.includes(keyPointId);
  }
  
  toggleKeyPoint(keyPointId: number): void {
    const currentKeyPoints = this.filterForm.get('keyPointIds')?.value || [];
    const index = currentKeyPoints.indexOf(keyPointId);
    
    if (index === -1) {
      currentKeyPoints.push(keyPointId);
    } else {
      currentKeyPoints.splice(index, 1);
    }
    
    this.filterForm.patchValue({ keyPointIds: currentKeyPoints });
    this.onFilterChange();
  }
  
  onFilterChange(): void {
    this.loading = true;
    this.error = null;
    
    this.paperIdeasService.getAllPaperIdeas(this.getFilters()).subscribe({
      next: (ideas) => {
        console.log('Paper ideas loaded successfully:', ideas);
        this.paperIdeas = ideas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading paper ideas:', err);
        this.error = 'Failed to load paper ideas. Please try again later.';
        this.loading = false;
      }
    });
  }
  
  getFilters(): PaperIdeaFilters {
    const formValue = this.filterForm.value;
    return {
      titleSearch: formValue.titleSearch,
      keyPointIds: formValue.keyPointIds,
      semesterId: this.activeSemesterId || undefined,
      activeSemesterOnly: true
    };
  }
  
  loadPaperIdeas(): void {
    this.loading = true;
    this.error = null;
    console.log('Loading paper ideas for active semester...');
    
    this.paperIdeasService.getAllPaperIdeas(this.getFilters()).subscribe({
      next: (ideas) => {
        console.log('Paper ideas loaded successfully:', ideas);
        this.paperIdeas = ideas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading paper ideas:', err);
        this.error = 'Failed to load paper ideas. Please try again later.';
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