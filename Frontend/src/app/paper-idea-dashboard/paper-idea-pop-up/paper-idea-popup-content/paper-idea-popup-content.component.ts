import { ChangeDetectionStrategy, Component, inject, model, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RegisterNewUserComponent } from '../../../admin-dashboard/register-popup/register-new-user/register-new-user.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatChipEditedEvent, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatIconModule } from '@angular/material/icon';
interface Tag{
  name: string;
}

@Component({
  standalone: true,
  selector: 'app-paper-idea-popup-content',
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule,
    MatIconModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './paper-idea-popup-content.component.html',
  styleUrl: './paper-idea-popup-content.component.scss',
})
export class PaperIdeaPopupContentComponent {
  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    title: [null, Validators.required],
    description: [null, Validators.required],
    groupsize: [null, Validators.required],
    oldTags: [[]],
  });




  constructor(private dialogRef: MatDialogRef<RegisterNewUserComponent>) {}
  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<Tag[]>([{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}]);
  readonly announcer = inject(LiveAnnouncer);
  databaseTags = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.update(tags => [...tags, {name: value}]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag.name}`);
      return [...tags];
    });
  }

  edit(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing fruit
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags[index].name = value;
        return [...tags];
      }
      return tags;
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      console.log(this.addressForm.value.oldTags);
      if (
        this.addressForm.value.title &&
        this.addressForm.value.description &&
        this.addressForm.value.groupsize
      ) {
        this.dialogRef.close();
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
