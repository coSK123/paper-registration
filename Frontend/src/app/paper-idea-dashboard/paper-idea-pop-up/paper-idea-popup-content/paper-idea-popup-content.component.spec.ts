import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperIdeaPopupContentComponent } from './paper-idea-popup-content.component';

describe('PaperIdeaPopupContentComponent', () => {
  let component: PaperIdeaPopupContentComponent;
  let fixture: ComponentFixture<PaperIdeaPopupContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperIdeaPopupContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperIdeaPopupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
