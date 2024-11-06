import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { UserqualificationComponent } from '../userqualification/userqualification.component';
import { Qualification } from '../../../models/User/Qualification/qualification';
import { FormGroup } from '@angular/forms';
import { LaborerService } from '../../../services/laborer.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import { Success } from '../../../models/Response/success';
import { UserQualifications } from '../../../models/User/Qualification/userqualifications';
import { Failure } from '../../../models/Response/failure';
import { Question } from '../../../models/Modals/question';
import { ModalService } from '../../../services/modal.service';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-userqualifications',
  templateUrl: './userqualifications.component.html',
  styleUrl: '../userStyle.css'
})
export class UserqualificationsComponent {
  @ViewChild('UserqualificationComponent') UserqualificationComponent: UserqualificationComponent = {} as UserqualificationComponent;
  @Output("goToPreviousStep") goToPreviousStep: EventEmitter<any> = new EventEmitter();
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
  
  dataSource: Qualification[] = [];
  displayedColumns: string[] = ['name', 'start', 'end', 'institution', 'status', 'actions'];
  frmUserQualification: FormGroup = {} as FormGroup;
  constructor(private laborerService: LaborerService, 
    private toastService: ToastService, private modalService: ModalService,
    private storageService: StorageService, private router: Router) {
  }

  submitted = false;

  ngOnInit() {
    let user = JSON.parse(this.storageService.getUser()) as Success;
    this.laborerService.getQualifications(user.response.value.id).subscribe((result: UserQualifications) => {
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
    model.request = () => this.removeQualification(id);
    this.modalService.question(model);    
  }

  public removeQualification(id: number) {
    this.laborerService.deleteQualification(id).subscribe(result=>{
      this.ngOnInit();
      let success = result as Success;
      console.log("success: " + JSON.stringify(success));
      this.toastService.success('Qualification successfully deleted!');
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
     });    
  }

  public view(id: number) {
    this.UserqualificationComponent.view(id);
  }

  get f(){
      return this.frmUserQualification.controls;
  }
}
