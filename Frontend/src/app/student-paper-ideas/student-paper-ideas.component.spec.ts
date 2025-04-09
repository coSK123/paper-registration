import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentPaperIdeasComponent } from './student-paper-ideas.component';
import { PaperIdeasService } from '../services/paper-ideas-service/paper-ideas.service';
import { CurrentUserService } from '../services/current-user/current-user.service';
import { ActiveSemesterService } from '../services/active-semester/active-semester.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StudentPaperIdeasComponent', () => {
  let component: StudentPaperIdeasComponent;
  let fixture: ComponentFixture<StudentPaperIdeasComponent>;
  let paperIdeasServiceSpy: jasmine.SpyObj<PaperIdeasService>;
  let activeSemesterServiceSpy: jasmine.SpyObj<ActiveSemesterService>;
  let httpClientSpy: jasmine.SpyObj<any>;

  const mockPaperIdeas = [
    {
      id: 1,
      title: 'Test Paper Idea 1',
      description: 'Description for test paper idea 1',
      creator: 'Test Professor',
      groupSize: '3',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01',
      KeyPoints: [{ description: 'Key Point 1' }]
    },
    {
      id: 2,
      title: 'Test Paper Idea 2',
      description: 'Description for test paper idea 2',
      creator: 'Test Professor',
      groupSize: '5',
      createdAt: '2023-01-02',
      updatedAt: '2023-01-02',
      KeyPoints: [{ description: 'Key Point 2' }]
    }
  ];

  const mockSemesters = [
    { name: 'Winter 2023', active: false },
    { name: 'Summer 2023', active: true },
    { name: 'Winter 2024', active: false }
  ];

  const mockKeyPoints = [
    { id: 1, description: 'Key Point 1' },
    { id: 2, description: 'Key Point 2' }
  ];

  beforeEach(async () => {
    paperIdeasServiceSpy = jasmine.createSpyObj('PaperIdeasService', ['getAllPaperIdeas']);
    activeSemesterServiceSpy = jasmine.createSpyObj('ActiveSemesterService', ['getAllSemesters']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    paperIdeasServiceSpy.getAllPaperIdeas.and.returnValue(of(mockPaperIdeas));
    activeSemesterServiceSpy.getAllSemesters.and.returnValue(of(mockSemesters));
    httpClientSpy.get.and.returnValue(of(mockKeyPoints));

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
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
        NoopAnimationsModule
      ],
      declarations: [ StudentPaperIdeasComponent ],
      providers: [
        { provide: PaperIdeasService, useValue: paperIdeasServiceSpy },
        { provide: ActiveSemesterService, useValue: activeSemesterServiceSpy },
        { provide: 'HttpClient', useValue: httpClientSpy },
        CurrentUserService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentPaperIdeasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load active semester on init', () => {
    expect(activeSemesterServiceSpy.getAllSemesters).toHaveBeenCalled();
    expect(component.activeSemesterId).toBe(2); // Index 1 + 1
  });

  it('should load paper ideas for active semester', () => {
    expect(paperIdeasServiceSpy.getAllPaperIdeas).toHaveBeenCalled();
    expect(component.paperIdeas).toEqual(mockPaperIdeas);
  });

  it('should load key points', () => {
    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(component.allKeyPoints).toEqual(mockKeyPoints);
  });

  it('should handle error when loading semesters', () => {
    activeSemesterServiceSpy.getAllSemesters.and.returnValue(throwError(() => new Error('Test error')));
    component.loadActiveSemester();
    expect(component.error).toBeTruthy();
  });

  it('should handle error when loading paper ideas', () => {
    paperIdeasServiceSpy.getAllPaperIdeas.and.returnValue(throwError(() => new Error('Test error')));
    component.loadPaperIdeas();
    expect(component.error).toBeTruthy();
  });

  it('should filter paper ideas when filter changes', () => {
    component.filterForm.patchValue({ groupSize: '3' });
    component.onFilterChange();
    expect(paperIdeasServiceSpy.getAllPaperIdeas).toHaveBeenCalled();
  });
}); 