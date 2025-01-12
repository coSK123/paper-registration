import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) {
   }

   authenticate(email: string, password: string) {
     this.http.post('http://localhost:3000/auth', {"email":email, "password":password}).subscribe((response) => {
       console.log(response);
     });
   }
}
