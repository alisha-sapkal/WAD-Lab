import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private registeredUsers = new BehaviorSubject<User[]>([]);
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() { }

  register(user: User): Observable<boolean> {
    return new Observable(observer => {
      // In a real application, this would make an HTTP request to your backend
      const currentUsers = this.registeredUsers.value;
      this.registeredUsers.next([...currentUsers, user]);
      this.currentUser.next(user);
      observer.next(true);
      observer.complete();
    });
  }

  getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  logout(): void {
    this.currentUser.next(null);
  }
}
