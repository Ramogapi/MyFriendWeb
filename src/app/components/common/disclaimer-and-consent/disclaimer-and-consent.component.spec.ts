import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisclaimerAndConsentComponent } from './disclaimer-and-consent.component';

describe('DisclaimerAndConsentComponent', () => {
  let component: DisclaimerAndConsentComponent;
  let fixture: ComponentFixture<DisclaimerAndConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisclaimerAndConsentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisclaimerAndConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
