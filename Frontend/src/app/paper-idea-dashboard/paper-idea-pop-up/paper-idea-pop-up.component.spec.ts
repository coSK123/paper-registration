import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperIdeaPopupComponent } from './paper-idea-pop-up.component';

describe('PaperIdeaPopUpComponent', () => {
  let component: PaperIdeaPopupComponent;
  let fixture: ComponentFixture<PaperIdeaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperIdeaPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaperIdeaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
