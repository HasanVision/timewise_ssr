import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { ButtonComponent } from '@app/ui/button/button.component';
import { InputTextComponent } from '@app/ui/input-text/input-text.component';
import { LabelComponent } from '@app/ui/label/label.component';
import { ModalComponent } from '@app/ui/modal/modal.component';
import { CurrentUser } from '@app/auth/authServices/getCurrentUser';
import { environment } from 'config/environment';
import axios , {AxiosError} from 'axios';


@Component({
  selector: 'app-verify-primary-email-otp',
  standalone: true,
  imports: [ModalComponent, InputTextComponent, LabelComponent, ButtonComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './verify-primary-email-otp.component.html',
  styleUrl: './verify-primary-email-otp.component.css'
})
export class VerifyPrimaryEmailOTPComponent implements OnInit {
  form: FormGroup;
  isLoading = false;
  errorMessage : string = '';
  successMessage: string = '';
  userId: number | null = null;

  @Output() closeModal = new EventEmitter<void>();
  constructor(private fb: FormBuilder , private currentUser : CurrentUser) {
    this.form = this.fb.group ({
      otp: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    })
  }

  async ngOnInit() {
    try{
      const user = await this.currentUser.getCurrentUser();
      this.currentUser = user;
      if (user) {
        console.log('User Id ', user.id)
        console.log( 'User data', user)
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
      console.log("user id " , this.userId)

      try {
        const response = await axios.post(
          `${environment.apiUrl}/settings/verify-otp-primary-email-update`,
          { token: otp, userId: this.userId }, // Use the stored user ID from ngOnInit
          { withCredentials: true }
        );

        this.isLoading = false;
        this.successMessage = response.data.message;

        // Emit an event to close the modal or inform the parent component about the success
        this.closeModal.emit();
      } catch (error) {
        this.isLoading = false;
       console.error('unnkown error', error)
      }
    } else {
      this.errorMessage = this.errorMessage

    }
  }

  onCancel() {
    this.closeModal.emit(); // Close the modal without verifying the OTP
  }
}
