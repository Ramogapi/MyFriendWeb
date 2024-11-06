import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from '../../../../models/Modals/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: '../modalStyle.css'
})
export class QuestionComponent {
  constructor(
    public dialogRef: MatDialogRef<QuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Question,
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onExecute(event: Event): void {
    this.model.request();
    this.dialogRef.close();
  }
}
