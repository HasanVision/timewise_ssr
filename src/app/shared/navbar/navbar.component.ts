import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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
    @Inject(PLATFORM_ID) private platformId: Object 
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId); 
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Detect and apply the theme from localStorage or system theme preference
      this.detectSystemTheme();
      this.isDarkTheme = localStorage.getItem('theme') === 'dark' || this.isDarkTheme;
      this.applyTheme();

      // Add a listener to detect system theme changes dynamically
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
        this.isDarkTheme = event.matches;
        this.applyTheme();
      });
    }

    this.authService.isLoggedIn.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  detectSystemTheme() {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkTheme = prefersDarkScheme;
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

  toggleTheme() {
    if (this.isBrowser) {
      this.isDarkTheme = !this.isDarkTheme;
      localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
      this.applyTheme();
    }
  }

  get themeIcon() {
    return this.isDarkTheme ? 'light_mode' : 'dark_mode';
  }

  async logout() {
   this.authService.logout();
  }
}