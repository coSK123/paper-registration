import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSemesterComponent } from './active-semester.component';

describe('ActiveSemesterComponent', () => {
  let component: ActiveSemesterComponent;
  let fixture: ComponentFixture<ActiveSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveSemesterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
