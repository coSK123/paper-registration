import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPopupContentComponent } from './register-popup-content.component';

describe('RegisterPopupContentComponent', () => {
  let component: RegisterPopupContentComponent;
  let fixture: ComponentFixture<RegisterPopupContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPopupContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPopupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
