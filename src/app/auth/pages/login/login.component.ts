import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputTextComponent } from '../../../ui/input-text/input-text.component';
import { ErrorComponent } from "../../../ui/error/error.component";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../ui/spinner/spinner.component';
import { RouterModule, Router } from '@angular/router';
import { CardComponent } from '../../../ui/card/card.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import axios from 'axios';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputTextComponent,
    ErrorComponent,
    FontAwesomeModule,
    CommonModule,
    SpinnerComponent,
    RouterModule,
    CardComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {

  form: FormGroup;
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;
  loginError: string | null = null;
  isRegisterPage: boolean = true;

  constructor(private fb: FormBuilder, private library: FaIconLibrary, private router: Router, private authService: AuthService) {
    this.library.addIcons(faEye, faEyeSlash);


    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

 
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  async onSubmit() {
    if (this.form.invalid) {
      return;
    }
  
    this.isLoading = true;
    const { email, password } = this.form.value;
  
    try {
      // Send the login request using axios
      const response = await this.authService.login(email, password);  // Use AuthService login method
      console.log('Login successful:', response);
  
      this.isLoading = false;
      
      // Ensure the navbar has time to update the state before redirect
      this.authService.checkSession().then(() => {
        this.router.navigate(['/dashboard']);
      });
      
    } catch (error) {
      console.error('Login error:', error);
      this.isLoading = false;
      this.loginError = 'Invalid email or password'; 
    }
  }

  resendEmail() {
    console.log('Resending verification email...');
  }
}