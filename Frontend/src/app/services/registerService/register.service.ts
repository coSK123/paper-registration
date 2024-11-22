import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }


  register(username: string, password: string) {
    this.http.post('http://localhost:3000/register', {"user":username, "password":password}).subscribe((response) => {
      console.log(response);
    });
}

}
