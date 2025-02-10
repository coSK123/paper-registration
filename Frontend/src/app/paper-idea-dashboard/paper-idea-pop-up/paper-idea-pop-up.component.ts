import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PaperIdeaPopupContentComponent } from './paper-idea-popup-content/paper-idea-popup-content.component';

/**
 * @title Dialog with header, scrollable content and actions
 */
@Component({
  standalone: true,
  selector: 'app-paper-idea-popup',
  templateUrl: 'paper-idea-pop-up.component.html',
  styleUrl: 'paper-idea-pop-up.component.scss',
  imports: [MatButtonModule, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaperIdeaPopupComponent {
  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(PaperIdeaPopupContentComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
