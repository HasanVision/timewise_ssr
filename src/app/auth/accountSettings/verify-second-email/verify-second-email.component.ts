import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../authServices/auth.service';
import { environment } from 'config/environment';
import axios, { AxiosError } from 'axios';

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
      const response = await axios.post(`${environment.apiUrl}/settings/verify-secondary-email`, 
        { token },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
  
      if (response.data.message === 'Secondary email verified successfully.') {
        this.authService.checkSession().then(() => {
          this.router.navigate(['/settings']);
        });
      } else {
        this.message = response.data.message || 'Verification failed.';
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error during email verification:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
          console.error('Response headers:', error.response.headers);
          this.message = error.response.data.message || 'Error verifying email. Please try again later.';
        } else if (error.request) {
          console.error('No response received:', error.request);
          this.message = 'No response from server. Please try again later.';
        } else {
          console.error('Error setting up request:', error.message);
          this.message = 'An unexpected error occurred. Please try again later.';
        }
      } else {
        console.error('Unexpected error during email verification:', error);
        this.message = 'An unexpected error occurred. Please try again later.';
      }
    }
  }
}