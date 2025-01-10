import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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
    this.http.post('http://localhost:3000/register', {"firstname":newUser.firstname,
                                                      "lastname":newUser.lastname,
                                                      "email": newUser.email,
                                                      "password": newUser.password,
                                                      "role": newUser.role
    }).subscribe((response) => {
      console.log(response);
      });
}

}
