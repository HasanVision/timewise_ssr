import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputTextComponent } from '../../../ui/input-text/input-text.component';
import { ErrorComponent } from "../../../ui/error/error.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import axios from 'axios';
import { SpinnerComponent } from '../../../ui/spinner/spinner.component';
import { CardComponent } from '../../../ui/card/card.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    SpinnerComponent,
    CardComponent,
    ButtonComponent,
    InputTextComponent,
    ErrorComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isRegisterPage: boolean = true;
  form: FormGroup;
  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  isLoading: boolean = false;
  registerError: string | null = null;  // Allow null type for better error handling
  successMessage: string | null = null; // Allow null type for success handling

  constructor(private fb: FormBuilder, private library: FaIconLibrary) {
    this.library.addIcons(faEye, faEyeSlash, faGoogle);

    this.form = this.fb.group(
      {
        firstname: new FormControl('', [Validators.required]),
        lastname: new FormControl('', [Validators.required]),
        primaryEmail: new FormControl('', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  // Validator to check if passwords match
  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }



  // Submit form logic
  async onSubmit() {
    if (this.form.valid) {
      this.isLoading = true;
      const { firstname, lastname, primaryEmail, password } = this.form.value;

      try {
        console.log('Registering user:', firstname, lastname, primaryEmail, password);
        const response = await axios.post('http://localhost:4000/api/register', {
          firstName: firstname,
          lastName: lastname,
          primaryEmail,
          password,
        });
        // Set success message
        this.successMessage =
          'Email verification link has been sent to your email address. Please verify your email to login.';
        this.registerError = null; // Clear any previous errors
        
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Registration failed:', error.response?.data);
          this.registerError = error.response?.data?.message || 'Registration failed. Please try again.';
        } else {
          this.registerError = 'An unexpected error occurred during registration.';
        }
      } finally {
        this.isLoading = false; 
      }
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  toggleConfirmPasswordVisibility() {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
  
}