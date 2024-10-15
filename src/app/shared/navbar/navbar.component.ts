import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth/authServices/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUser, faSignOutAlt, faCog, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isDarkTheme: boolean = false;
  faHome = faHome;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faCog = faCog;
  faSun = faSun;
  faMoon = faMoon;
  isBrowser: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object // Inject the platform
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if we are in the browser
  }

  ngOnInit() {
    // Only access localStorage if we are in the browser
    if (this.isBrowser) {
      this.isDarkTheme = localStorage.getItem('theme') === 'dark';
      this.applyTheme();
    }

    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  toggleTheme() {
    if (this.isBrowser) {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
      this.applyTheme();
    }
  }

  applyTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
