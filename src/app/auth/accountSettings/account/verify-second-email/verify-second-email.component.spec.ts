import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifySecondEmailComponent } from './verify-second-email.component';

describe('VerifySecondEmailComponent', () => {
  let component: VerifySecondEmailComponent;
  let fixture: ComponentFixture<VerifySecondEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifySecondEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifySecondEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
