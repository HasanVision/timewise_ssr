import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrimaryEmailComponent } from './update-primary-email.component';

describe('UpdatePrimaryEmailComponent', () => {
  let component: UpdatePrimaryEmailComponent;
  let fixture: ComponentFixture<UpdatePrimaryEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePrimaryEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePrimaryEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
