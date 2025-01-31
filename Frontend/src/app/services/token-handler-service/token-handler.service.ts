import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

export interface DecodedToken {
  email: string;
  role: string;
  exp: number;
}
@Injectable({
  providedIn: 'root'
})
export class TokenHandlerService {
  private tokenKey = 'accessToken';

  storeToken(token: string) {
    console.log("token is stored:" +token);
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }


  getDecodedToken(): DecodedToken | null {
    const token = this.getToken();
    return token ? jwtDecode<DecodedToken>(token) : null;
  }

  getRole(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.role : null;
  }
}
