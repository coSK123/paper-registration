import { Injectable } from '@angular/core';

export interface User {
  email: string;
  role: string;
}
@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor() {}

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem('user');
  }

  getUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isAdmin(): boolean {
    if (this.getUser()?.role === 'Administrator') {
      return true;
    } else {
      return false;
    }
  }

  isStudent(): boolean {
    if (this.getUser()?.role === 'Student') {
      return true;
    } else {
      return false;
    }
  }

  isProfessor(): boolean {
    if (this.getUser()?.role === 'Professor') {
      return true;
    } else {
      return false;
    }
  }
}
