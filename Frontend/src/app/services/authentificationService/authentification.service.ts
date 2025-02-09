import { CurrentUserService } from './../current-user/current-user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  DecodedToken,
  TokenHandlerService,
} from '../token-handler-service/token-handler.service';
import { environment } from '../../../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { RoutingService } from '../routing-service/routing.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  constructor(
    private http: HttpClient,
    private tokenService: TokenHandlerService,
    private CurrentUserService: CurrentUserService,
    private routingService: RoutingService,
    private router: Router
  ) {
    if(this.CurrentUserService.isUserLoggedIn()) {
      this.router.navigate([this.routingService.routeAfterLogin()]);
    }
  }

  authenticate(email: string, password: string) {
    this.http
      .post<{ accessToken: string }>(`${environment.apiUrl}/auth`, {
        email: email,
        password: password,
      })
      .subscribe((response) => {
        console.log(response);
        this.tokenService.storeToken(response.accessToken);
        this.storeUser(response);
        this.router.navigate([this.routingService.routeAfterLogin()]);
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
