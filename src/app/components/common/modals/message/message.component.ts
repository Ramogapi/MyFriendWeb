import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from '../../../../models/Modals/question';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: '../modalStyle.css'
})
export class MessageComponent {
  constructor(
    public dialogRef: MatDialogRef<MessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Question,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
