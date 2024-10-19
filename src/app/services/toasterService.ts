// toaster.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Toast {
  message: string | null;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  // Initialize with no message
  private toastSubject = new BehaviorSubject<Toast>({ message: null, type: 'info' });

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toastSubject.next({ message, type });
  }

  getMessage(): Observable<Toast> {
    return this.toastSubject.asObservable();
  }

  clear() {
    // Method to clear the toast message
    this.toastSubject.next({ message: null, type: 'info' });
  }
}