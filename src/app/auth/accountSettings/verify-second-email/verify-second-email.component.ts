import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../../authServices/auth.service';
import { environment } from 'config/environment';

@Component({
  selector: 'app-verify-second-email',
  standalone: true,
  imports: [],
  template: `<div>{{ message }}</div>`,
  styleUrls: ['./verify-second-email.component.css'] // Corrected the property name
})
export class VerifySecondEmailComponent implements OnInit {
  message: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService 
  ) {}

  async ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.message = 'No token provided.';
      return;
    }

    console.log('Token from URL:', token);

    try {
      // Send request to verify the secondary email using the token
      const response = await axios.post(`${environment.apiUrl}/settings/verify-secondary-email`, { token });

      if (response.data.message === 'Secondary email verified successfully.') {
        this.message = 'Email verified successfully! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/settings']); 
        }, 2000);
      } else {
        this.message = response.data.message || 'Verification failed.';
      }
    } catch (error) {
      console.error('Error during email verification:', error);
      this.message = 'Error verifying email. Please try again later.';
    }
  }
}