import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CurrentUserService } from '../current-user/current-user.service';
import { environment } from '../../../environments/environment';

export interface PaperIdea {
  id: number;
  title: string;
  description: string;
  creator: string;
  groupSize: string;
  createdAt: string;
  updatedAt: string;
  KeyPoints?: { description: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class PaperIdeasService {

  constructor(private http: HttpClient, private currentUser: CurrentUserService) { }

  getProfessorPaperIdeas(): Observable<PaperIdea[]> {
    const user = this.currentUser.getUser();
    if (user) {
      return this.http.get<PaperIdea[]>(`${environment.apiUrl}/paper/professor/${user.email}`);
    } else {
      return throwError(() => new Error('User not authenticated'));
    }
  }

  getAllPaperIdeas(): Observable<PaperIdea[]> {
    return this.http.get<PaperIdea[]>(`${environment.apiUrl}/paper`);
  }

  getPaperIdeaById(id: number): Observable<PaperIdea> {
    return this.http.get<PaperIdea>(`${environment.apiUrl}/paper/${id}`);
  }
} 