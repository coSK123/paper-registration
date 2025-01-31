import { CurrentUserService } from './../current-user/current-user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DecodedToken,
  TokenHandlerService,
} from '../token-handler-service/token-handler.service';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenHandlerService,
    private CurrentUserService: CurrentUserService
  ) {}

  authenticate(email: string, password: string) {
    console.log(environment.name);
    this.http
      .post<{ accessToken: string }>(`${environment.apiUrl}/auth`, {
        email: email,
        password: password,
      })
      .subscribe((response) => {
        console.log(response);
        this.tokenService.storeToken(response.accessToken);
        this.storeUser(response);
      });
  }

  logout() {
    this.tokenService.clearToken();
    this.CurrentUserService.removeUser();
  }

  storeUser(response: { accessToken: string }) {
    const decodedToken = jwtDecode<DecodedToken>(response.accessToken);
    if (decodedToken.email && decodedToken.role) {
      this.CurrentUserService.saveUser({
        email: decodedToken.email,
        role: decodedToken.role,
      });
    }
  }
}
