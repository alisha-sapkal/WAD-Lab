import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  
  // Default credentials
  private readonly DEFAULT_EMAIL = 'admin@example.com';
  private readonly DEFAULT_PASSWORD = 'admin123';

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    // Check if credentials match the default ones
    if (email === this.DEFAULT_EMAIL && password === this.DEFAULT_PASSWORD) {
      this.isAuthenticated.next(true);
      return new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
    }
    return new Observable(observer => {
      observer.next(false);
      observer.complete();
    });
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  // Method to get default credentials for display
  getDefaultCredentials(): { email: string, password: string } {
    return {
      email: this.DEFAULT_EMAIL,
      password: this.DEFAULT_PASSWORD
    };
  }
}
