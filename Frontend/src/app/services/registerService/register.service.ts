import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CurrentUserService } from '../current-user/current-user.service';
import { environment } from '../../../environments/environment';


export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient, private currentUser: CurrentUserService) { }

  register(newUser: User): Observable<any> {
    if (this.currentUser.isAdmin()) {
      return this.http.post(`${environment.apiUrl}/register`, {
        "firstname": newUser.firstname,
        "lastname": newUser.lastname,
        "email": newUser.email,
        "password": newUser.password,
        "role": newUser.role
      });
    } else {
      return throwError(() => new Error('You do not have permission to register a new user.'));
    }
  }
}
