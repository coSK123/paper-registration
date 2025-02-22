import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-active-semester',
  imports: [MatFormFieldModule, MatAutocompleteModule, MatInputModule, FormsModule, MatCardModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './active-semester.component.html',
  styleUrl: './active-semester.component.scss'
})
export class ActiveSemesterComponent{
myControl = new FormControl('');
filteredOptions: Observable<string[]>;

semesters = ["W22", "S22", "W23", "S23"]
currentlyActiveSemester: string

constructor() {
  this.currentlyActiveSemester = "W22"
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );
}


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.semesters.filter(semester => semester.toLowerCase().includes(filterValue));
  }
}
