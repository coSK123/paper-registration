import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperIdeaDashboardComponent } from './paper-idea-dashboard.component';

describe('PaperIdeaDashboardComponent', () => {
  let component: PaperIdeaDashboardComponent;
  let fixture: ComponentFixture<PaperIdeaDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperIdeaDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaperIdeaDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
