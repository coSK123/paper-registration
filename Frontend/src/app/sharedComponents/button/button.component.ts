import { HttpClient,  } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [], // Add HttpClientModule to imports
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
 
})
export class ButtonComponent {
  test = 'test';

  constructor(private http: HttpClient) {
  }

  onButtonClick() {
    this.http.get('http://localhost:3000').subscribe(response => {
      console.log(response);
    });
  }
}
