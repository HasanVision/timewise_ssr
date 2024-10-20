import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPrimaryEmailOTPComponent } from './verify-primary-email-otp.component';

describe('VerifyPrimaryEmailOTPComponent', () => {
  let component: VerifyPrimaryEmailOTPComponent;
  let fixture: ComponentFixture<VerifyPrimaryEmailOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyPrimaryEmailOTPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyPrimaryEmailOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
