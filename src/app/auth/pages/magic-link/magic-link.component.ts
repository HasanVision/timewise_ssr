import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { AuthService } from '../../authServices/auth.service';


@Component({
  selector: 'app-magic-link',
  template: `<div>{{message}}</div>`,
})
export class MagicLinkComponent implements OnInit {
  message = '';

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService ) {}

  async ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.message = 'No token provided.';
      return;
    }
    // console.log('Token from URL:', token);s
    
    if (token) {
      try {
        const response = await axios.post('http://localhost:4000/api/verify-magic-link', { token }, { withCredentials: true });
        console.log('Magic link verification response:', response.data);
        // localStorage.setItem('user', JSON.stringify(response.data.user));
        this.message = 'Login successful!';
        this.authService.checkSession().then(() => {
          this.router.navigate(['/dashboard']);
        });
      } catch (error) {
        this.message = 'Invalid or expired magic link.';
      }
    } else {
      this.message = 'No token provided.';
    }
  }
}

