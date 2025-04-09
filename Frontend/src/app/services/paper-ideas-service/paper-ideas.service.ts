import { HttpClient, HttpParams } from '@angular/common/http';
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
  semesterId?: number;
}

export interface PaperIdeaFilters {
  groupSize?: string;
  keyPointIds?: number[];
  semesterId?: number;
  titleSearch?: string;
  activeSemesterOnly?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaperIdeasService {

  constructor(private http: HttpClient, private currentUser: CurrentUserService) { }

  getProfessorPaperIdeas(filters?: PaperIdeaFilters): Observable<PaperIdea[]> {
    const user = this.currentUser.getUser();
    if (user) {
      let params = new HttpParams();
      
      if (filters) {
        if (filters.groupSize) {
          params = params.set('groupSize', filters.groupSize);
        }
        
        if (filters.keyPointIds && filters.keyPointIds.length > 0) {
          params = params.set('keyPointIds', filters.keyPointIds.join(','));
        }
        
        if (filters.semesterId) {
          params = params.set('semesterId', filters.semesterId.toString());
        }
        
        if (filters.titleSearch) {
          params = params.set('titleSearch', filters.titleSearch);
        }
        
        if (filters.activeSemesterOnly !== undefined) {
          params = params.set('activeSemesterOnly', filters.activeSemesterOnly.toString());
        }
      }
      
      return this.http.get<PaperIdea[]>(`${environment.apiUrl}/paper/professor/${user.email}`, { params });
    } else {
      return throwError(() => new Error('User not authenticated'));
    }
  }

  getAllPaperIdeas(filters?: PaperIdeaFilters): Observable<PaperIdea[]> {
    let params = new HttpParams();
    
    if (filters) {
      if (filters.groupSize) {
        params = params.set('groupSize', filters.groupSize);
      }
      
      if (filters.keyPointIds && filters.keyPointIds.length > 0) {
        params = params.set('keyPointIds', filters.keyPointIds.join(','));
      }
      
      if (filters.semesterId) {
        params = params.set('semesterId', filters.semesterId.toString());
      }
      
      if (filters.titleSearch) {
        params = params.set('titleSearch', filters.titleSearch);
      }
      
      if (filters.activeSemesterOnly !== undefined) {
        params = params.set('activeSemesterOnly', filters.activeSemesterOnly.toString());
      }
    }
    
    return this.http.get<PaperIdea[]>(`${environment.apiUrl}/paper`, { params });
  }

  getPaperIdeaById(id: number): Observable<PaperIdea> {
    return this.http.get<PaperIdea>(`${environment.apiUrl}/paper/${id}`);
  }
} 