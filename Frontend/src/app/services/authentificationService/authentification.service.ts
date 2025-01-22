import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenHandlerService } from '../token-handler-service/token-handler.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient, private tokenService: TokenHandlerService) {
   }

   authenticate(email: string, password: string) {
    console.log(environment.name)
     this.http.post<{ accessToken: string }>(`${environment.apiUrl}/auth`, {"email":email, "password":password}).subscribe((response) => {
       console.log(response);
      this.tokenService.storeToken(response.accessToken);
     });
   }
}
