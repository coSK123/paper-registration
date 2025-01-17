import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../registerService/register.service';

@Injectable({
  providedIn: 'root'
})
export class GetUsersFromDatabaseService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return  this.http.get('http://localhost:3000/users');
  }
}
