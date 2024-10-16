import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class CurrentUser {
  constructor() {}

  async getCurrentUser() {
    try {
      const response = await axios.get('http://localhost:4000/api/current-user', { withCredentials: true });
      return response.data.user; // Assuming the backend returns { user: { ...userData } }
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      return null;
    }
  }
}