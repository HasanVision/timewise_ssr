import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '@app/ui/button/button.component';
import { InputTextComponent } from '@app/ui/input-text/input-text.component';
import { LabelComponent } from '@app/ui/label/label.component';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { CurrentUser } from '@app/auth/authServices/getCurrentUser';
import { environment } from 'config/environment';
import axios, { AxiosError } from 'axios';

@Component({
  selector: 'app-verify-primary-email-otp',
  standalone: true,
  imports: [ModalComponent, InputTextComponent, LabelComponent, ButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './verify-primary-email-otp.component.html',
  styleUrls: ['./verify-primary-email-otp.component.css']
})
export class VerifyPrimaryEmailOTPComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';
  userId: number | null = null;

  @Output() closeModal = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private currentUserService: CurrentUser) {
    this.form = this.fb.group({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    });
  }

  async ngOnInit() {
    try {
      const user = await this.currentUserService.getCurrentUser();
      if (user) {
        this.userId = user.id; // Correctly store the user ID
        console.log('User Id:', this.userId);
        console.log('User data:', user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      this.errorMessage = 'Failed to load user data.';
    }
  }

  async onSubmit() {
    if (this.form.valid && this.userId) {
      this.isLoading = true;
      this.errorMessage = '';
      const { otp } = this.form.value;
      console.log('User ID:', this.userId);

      try {
        const response = await axios.post(
          `${environment.apiUrl}/settings/verify-otp-primary-email-update`,
          { token: otp, userId: this.userId }, // Use the stored user ID
          { withCredentials: true }
        );

        this.isLoading = false;
        this.successMessage = response.data.message;

        // Emit an event to close the modal or inform the parent component about the success
        this.closeModal.emit();
      } catch (error) {
        this.isLoading = false;
        if (error instanceof AxiosError && error.response) {
          this.errorMessage = error.response.data.message || 'An error occurred while verifying OTP.';
        } else {
          this.errorMessage = 'An unknown error occurred. Please try again.';
        }
        console.error('Error during OTP verification:', error);
      }
    } else {
      this.errorMessage = 'Please enter a valid 6-digit OTP.';
    }
  }

  onCancel() {
    this.closeModal.emit(); // Close the modal without verifying the OTP
  }
}