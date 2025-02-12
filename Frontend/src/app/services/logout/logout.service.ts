import { Injectable } from '@angular/core';
import { CurrentUserService } from '../current-user/current-user.service';
import { TokenHandlerService } from '../token-handler-service/token-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private currentUser: CurrentUserService, private tokenHandler: TokenHandlerService) { 
  }


  logout() {
    this.currentUser.removeUser();
    this.tokenHandler.clearToken();
  }
}
