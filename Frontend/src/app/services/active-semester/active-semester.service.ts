import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveSemesterService {

  constructor() { }

  getCurrentActiveSemester() {
    return "W22"
  }

  getAllSemesters() {
    return ["W22", "S22", "W23", "S23"]
  }

  setActiveSemester(semester: string) {
    console.log("Active semester set to " + semester)
  }


}
