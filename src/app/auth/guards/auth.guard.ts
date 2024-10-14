import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  async canActivate(): Promise<boolean> {
    try {
      const response = await axios.get('http://localhost:4000/api/check-session', { withCredentials: true });
      if (response.data.isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }
}