import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QuestionComponent } from '../components/common/modals/question/question.component';
import { MessageComponent } from '../components/common/modals/message/message.component';
import { Question } from '../models/Modals/question';
import { Message } from '../models/Modals/message';
import { ChooseComponent } from '../components/common/modals/choose/choose.component';
import { Choose } from '../models/Modals/choose';
import { Select } from '../models/Modals/select';
import { SelectComponent } from '../components/common/modals/select/select.component';
import { ViewComponent } from '../components/common/modals/view/view.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(public dialog: MatDialog) { }


  choose(model: Choose): void {
    this.dialog.open(ChooseComponent, {
      data: model
    });
  }

  message(model: Message): void {
    this.dialog.open(MessageComponent, {
      data: model
    });
  }

  question(model: Question): void {
    this.dialog.open(QuestionComponent, {
      data: model
    });
  }

  select(model: Select): void {
    this.dialog.open(SelectComponent, {
      data: model
    });
  }

  view(model: Select): void {
    this.dialog.open(ViewComponent, {
      data: model
    });
  }
}
