import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { Success } from '../../../models/Response/success';
import { Failure } from '../../../models/Response/failure';
import { UserSkills } from '../../../models/User/Skill/userskills';
import { LaborerService } from '../../../services/laborer.service';
import { Skill } from '../../../models/User/Skill/skill';
import { UserskillComponent } from '../userskill/userskill.component';
import { Question } from '../../../models/Modals/question';
import { ModalService } from '../../../services/modal.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-userskills',
  templateUrl: './userskills.component.html',
  styleUrl: '../userStyle.css'
})
export class UserskillsComponent {
  @ViewChild('UserskillComponent') UserskillComponent: UserskillComponent = {} as UserskillComponent;
  @Output("goToPreviousStep") goToPreviousStep: EventEmitter<any> = new EventEmitter();
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
  
  dataSource: Skill[] = [];
  displayedColumns: string[] = ['profession', 'level', 'description', 'actions'];
  frmUserSkill: FormGroup = {} as FormGroup;
  constructor(private laborerService: LaborerService, 
    private toastService: ToastService, private modalService: ModalService,
    private storageService: StorageService, private router: Router) {
  }

  submitted = false;

  ngOnInit() {
    let user = JSON.parse(this.storageService.getUser()) as Success;
    this.laborerService.getSkills(user.response.id).subscribe((result: UserSkills) => {
      this.dataSource = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public back() {
    this.goToPreviousStep.emit();
  }

  public next() {
    this.goToNextStep.emit();
  }

  public delete(id: number, name: string) {
    const model: Question = {} as Question;
    model.title = 'Delete';
    model.content = 'Are you sure you want to delete <b>"' + name + '"</b>?';
    model.request = () => this.removeSkill(id);
    this.modalService.question(model);    
  }

  public removeSkill(id: number) {
    this.laborerService.deleteSkill(id).subscribe(result=>{
      this.ngOnInit();
      let success = result as Success;
      console.log("success: " + JSON.stringify(success));
      this.toastService.success('Skill successfully deleted!');
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
     });    
  }

  public view(id: number) {
    this.UserskillComponent.view(id);
  }

  get f(){
      return this.frmUserSkill.controls;
  }
}
