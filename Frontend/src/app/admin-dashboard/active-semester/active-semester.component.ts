import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-active-semester',
  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule, MatCardModule],
  templateUrl: './active-semester.component.html',
  styleUrl: './active-semester.component.scss'
})
export class ActiveSemesterComponent {
semesters = ["W22", "S22", "W23", "S23"]
selectedSemester = "W22"
}
