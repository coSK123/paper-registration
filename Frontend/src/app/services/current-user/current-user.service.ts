import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private loggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  loginStatusChanged = this.loggedIn.asObservable();

  constructor() {}

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true); // Notify subscribers that the user is logged in
  }

  removeUser(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false); // Notify subscribers that the user is logged out
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isUserLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'Administrator';
  }

  isStudent(): boolean {
    return this.getUser()?.role === 'Student';
  }

  isProfessor(): boolean {
    return this.getUser()?.role === 'Dozent';
  }
}
