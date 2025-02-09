import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-paper-idea-popup-content',
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './paper-idea-popup-content.component.html',
  styleUrl: './paper-idea-popup-content.component.scss'
})
export class PaperIdeaPopupContentComponent {

}
