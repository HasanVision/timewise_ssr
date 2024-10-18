import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  
  constructor() {

    this.checkSession();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


  async checkSession() {
    try {
      const response = await axios.get('http://localhost:4000/api/check-session', { withCredentials: true });
      this.loggedIn.next(response.data.isLoggedIn);
    } catch (error) {
      this.loggedIn.next(false);
      console.error('Error checking session:', error);
    }
  }

  async login(email: string, password: string) {
    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, password }, { withCredentials: true });
      this.loggedIn.next(true); 
      return response.data;
    } catch (error) {
      throw new Error('Login failed');
    }
  }


  async logout() {
    try {
      await axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true });
      this.loggedIn.next(false); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}

// TODO: CHECK IF THE SESSION CALLED TWICE, LOGIN IN PAGE FLASHES