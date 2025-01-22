import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenHandlerService } from '../token-handler-service/token-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private tokenService: TokenHandlerService) {
   }

   authenticate(email: string, password: string) {
     this.http.post<{ accessToken: string }>('http://141.72.188.181:3000/auth', {"email":email, "password":password}).subscribe((response) => {
       console.log(response);
      this.tokenService.storeToken(response.accessToken);
     });
   }
}
