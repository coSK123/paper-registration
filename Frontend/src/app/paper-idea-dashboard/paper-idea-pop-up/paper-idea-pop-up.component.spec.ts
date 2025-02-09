import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperIdeaPopUpComponent } from './paper-idea-pop-up.component';

describe('PaperIdeaPopUpComponent', () => {
  let component: PaperIdeaPopUpComponent;
  let fixture: ComponentFixture<PaperIdeaPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperIdeaPopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperIdeaPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
