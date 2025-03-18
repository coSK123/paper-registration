import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

interface Semester {
  name: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ActiveSemesterService {

  constructor(private http: HttpClient) { }

   getCurrentActiveSemester(){

    return this.http.get<Semester>(`${environment.apiUrl}/getActiveSemester`, {})
  }

  getAllSemesters() {


    return this.http.get<Semester[]>(`${environment.apiUrl}/allSemesters`, {})

  }

  setActiveSemester(semester: string) {
    this.http.post(`${environment.apiUrl}/setActiveSemester`, {name: semester}).subscribe();
  }


}
