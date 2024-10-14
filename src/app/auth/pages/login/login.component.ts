import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ButtonComponent } from '../../../ui/button/button.component';
import { InputTextComponent } from '../../../ui/input-text/input-text.component';
import { ErrorComponent } from "../../../ui/error/error.component";
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../ui/spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../ui/card/card.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


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
  styleUrls: ['./login.component.css'] // Fix typo (styleUrl -> styleUrls)
})
export class LoginComponent {
  form: FormGroup;
  isPasswordVisible: boolean = false;
  isLoading: boolean = false;
  loginError: string | null = null;
  isRegisterPage: boolean = true;

  constructor(private fb: FormBuilder, private library: FaIconLibrary, private router: RouterModule) {
    this.library.addIcons(faEye, faEyeSlash);


    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Toggle visibility for the password field
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Handle form submission
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;

    // Perform login logic
    const { email, password } = this.form.value;
    console.log('Login attempt:', email, password);

    // Simulate an async login operation
    setTimeout(() => {
      this.isLoading = false;
      this.loginError = 'Invalid email or password';
    }, 2000);
  }

  // Simulate resending email
  resendEmail() {
    console.log('Resending verification email...');
  }
}