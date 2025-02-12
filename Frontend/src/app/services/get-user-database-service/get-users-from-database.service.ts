import { CurrentUserService } from './../current-user/current-user.service';
import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetUsersFromDatabaseService {

  constructor(private http: HttpClient, private currentUserService: CurrentUserService) { }

  getUsers() {
    if (this.currentUserService.isAdmin()) {
      const options = {
        withCredentials: true // Include credentials (cookies)
      };
      return this.http.get(`${environment.apiUrl}/users`, options);
    } else {
      return throwError(() => new Error('You do not have permission to view this resource.'));
    }
  }
}
