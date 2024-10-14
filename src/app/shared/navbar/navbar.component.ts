import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import axios from 'axios';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'] // Fix typo here: it should be style**s**Url
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to the login state to update the navbar when login state changes
    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }

  getButtonVariant(route: string): 'primary' | 'secondary' | 'ghost' {
    return this.isActiveRoute(route) ? 'primary' : 'secondary';
  }

  async logout() {
    try {
      await axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true });
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}