import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // BehaviorSubject to hold login state (true or false)
  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor() {
    // Call this to check if the session is active when the app starts
    this.checkSession();
  }

  // Getter to access the login status as an observable
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // Call backend to check session status
  async checkSession() {
    try {
      const response = await axios.get('http://localhost:4000/api/check-session', { withCredentials: true });
      this.loggedIn.next(response.data.isLoggedIn);
    } catch (error) {
      this.loggedIn.next(false);
      console.error('Error checking session:', error);
    }
  }

  // Call backend to log in the user
  async login(email: string, password: string) {
    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password }, { withCredentials: true });
      this.loggedIn.next(true);  // Update login state to true
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }

  // Call backend to log out the user
  async logout() {
    try {
      await axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true });
      this.loggedIn.next(false);  // Update login state to false
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}