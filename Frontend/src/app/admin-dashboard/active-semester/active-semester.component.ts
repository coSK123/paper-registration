import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActiveSemesterService } from '../../services/active-semester/active-semester.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-active-semester',
  imports: [
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatButtonModule,
  ],
  templateUrl: './active-semester.component.html',
  styleUrl: './active-semester.component.scss',
})
export class ActiveSemesterComponent {
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  semesters: string[];
  currentlyActiveSemester: string;

  constructor(private activeSemesterService: ActiveSemesterService) {
    this.currentlyActiveSemester =
      this.activeSemesterService.getCurrentActiveSemester();
    this.semesters = this.activeSemesterService.getAllSemesters();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.semesters.filter((semester) =>
      semester.toLowerCase().includes(filterValue)
    );
  }

  onSubmit() {
    if (this.myControl.value != null) {
      this.activeSemesterService.setActiveSemester(this.myControl.value);
    }
  }
}
