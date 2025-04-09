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

interface Semester {
  id: number;
  name: string;
  active: boolean;
}

interface KeyPoint {
  id: number;
  description: string;
}

@Component({
  selector: 'app-professor-paper-ideas',
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
  templateUrl: './professor-paper-ideas.component.html',
  styleUrls: ['./professor-paper-ideas.component.scss']
})
export class ProfessorPaperIdeasComponent implements OnInit {
  paperIdeas: PaperIdea[] = [];
  loading = true;
  error: string | null = null;
  filterForm: FormGroup;
  semesters: Semester[] = [];
  activeSemester: Semester | null = null;
  groupSizeOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
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
      groupSize: [''],
      keyPointIds: [[]],
      semesterId: ['']
    });
  }
  
  ngOnInit(): void {
    console.log('Professor Paper Ideas Component initialized');
    const currentUser = this.currentUserService.getUser();
    console.log('Current user:', currentUser);
    
    this.loadSemesters();
    this.loadKeyPoints();
    this.setupSearchSubscription();
    this.loadPaperIdeas();
  }
  
  loadSemesters(): void {
    this.activeSemesterService.getAllSemesters().subscribe({
      next: (semesters: any[]) => {
        // Map the semesters to include id
        this.semesters = semesters.map((sem, index) => ({
          id: index + 1,
          name: sem.name,
          active: sem.active
        }));
        
        this.activeSemester = this.semesters.find(s => s.active) || null;
        
        if (this.activeSemester) {
          this.filterForm.patchValue({
            semesterId: this.activeSemester.id.toString()
          });
          this.onFilterChange(); // Trigger initial load with active semester
        }
      },
      error: (err) => {
        console.error('Error loading semesters:', err);
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
        return this.paperIdeasService.getProfessorPaperIdeas(this.getFilters());
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
    
    this.paperIdeasService.getProfessorPaperIdeas(this.getFilters()).subscribe({
      next: (ideas) => {
        console.log('Paper ideas loaded successfully:', ideas);
        this.paperIdeas = ideas;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading paper ideas:', err);
        this.error = 'Failed to load your paper ideas. Please try again later.';
        this.loading = false;
      }
    });
  }
  
  getFilters(): PaperIdeaFilters {
    const formValue = this.filterForm.value;
    return {
      titleSearch: formValue.titleSearch,
      groupSize: formValue.groupSize,
      keyPointIds: formValue.keyPointIds,
      semesterId: formValue.semesterId ? parseInt(formValue.semesterId) : undefined
    };
  }
  
  loadPaperIdeas(): void {
    this.loading = true;
    this.error = null;
    console.log('Loading paper ideas...');
    
    this.paperIdeasService.getProfessorPaperIdeas(this.getFilters()).subscribe({
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