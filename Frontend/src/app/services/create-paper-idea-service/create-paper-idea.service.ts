import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserService } from '../current-user/current-user.service';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreatePaperIdeaService {

  constructor(private http: HttpClient, private currentUser: CurrentUserService) { }

  createPaperIdea(title: string, description: string, groupsize: number, tags: string[]) {
  
    const user = this.currentUser.getUser();
    if (user) {
      const useremail = user.email;
      return this.http.post(`${environment.apiUrl}/paper`, {
        title: title,
        description: description,
        creator: useremail,
        groupsize: groupsize,
        keyPoints: tags,
      });
    } else {
      return throwError(() => new Error('You do not have permission to view this resource.'));
    }
    
  }
}
