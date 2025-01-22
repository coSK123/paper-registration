import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


export interface User{
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

  constructor(private http: HttpClient) { }


  register(newUser: User) {
    console.log(newUser);
    this.http.post(`${environment.apiUrl}/register`, {"firstname":newUser.firstname,
                                                      "lastname":newUser.lastname,
                                                      "email": newUser.email,
                                                      "password": newUser.password,
                                                      "role": newUser.role
    }).subscribe((response) => {
      console.log(response);
      });
}

}
