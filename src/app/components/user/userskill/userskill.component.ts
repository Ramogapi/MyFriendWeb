import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Skill } from '../../../models/User/Skill/skill';
import { CodeLookUp } from '../../../models/LookUp/codelookup';
import { IdentityService } from '../../../services/identity.service';
import { StorageService } from '../../../services/storage.service';
import { ToastService } from '../../../services/toast.service';
import { Failure } from '../../../models/Response/failure';
import { CodeLookUpResponse } from '../../../models/LookUp/codelookupresponse';
import { Success } from '../../../models/Response/success';
import { LaborerService } from '../../../services/laborer.service';
import { UserSkill } from '../../../models/User/Skill/userskill';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-userskill',
  templateUrl: './userskill.component.html',
  styleUrl: '../userStyle.css'
})
export class UserskillComponent implements OnInit {
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
  @Output("ngOnInit") reload: EventEmitter<any> = new EventEmitter();
  frmUserSkill: FormGroup = {} as FormGroup;

  public model: Skill = new Skill();
  message: String = '';
  professions: CodeLookUp[] = [];
  levels: CodeLookUp[] = [];
  constructor(private identityService: IdentityService, 
    private storageService: StorageService, private laborerService: LaborerService,
    private toastService: ToastService, private formBuilder: FormBuilder) {
      this.createForm();
  }

  createForm() {
      this.frmUserSkill = this.formBuilder.group({
        professionCode: ['', Validators.required],
        levelCode: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  submitted = false;

  ngOnInit() {
    this.identityService.getCodeLookUps('Profession').subscribe((result: CodeLookUpResponse) => {
      this.professions = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
    this.identityService.getCodeLookUps('Level').subscribe((result: CodeLookUpResponse) => {
      this.levels = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public submit() {
    let user = JSON.parse(this.storageService.getUser()) as Success;
    this.model.workerId = user.response.value.id;

    console.log('model: ' + JSON.stringify(this.model));
    
    this.submitted = true;

    if(this.model.id > 0){
      this.laborerService.updateSkill(this.model)
               .subscribe(result=>{
                this.refresh();
                let success = result as Success;
                console.log("success: " + JSON.stringify(success));
                this.toastService.success('Skill successfully saved!');
               },error=>{
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
    } else {
      this.laborerService.createSkill(this.model)
               .subscribe(result=>{
                this.refresh();
                let success = result as Success;
                console.log("success: " + JSON.stringify(success));
                this.toastService.success('Skill successfully saved!');
               },error=>{
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
    }
  }

  view(id : number) {
    this.laborerService.getSkill(id).subscribe((result: UserSkill) => {
      debugger;
      this.model = result.response;
    },error=>{
      debugger;
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public refresh(){
    this.reload.emit();
    this.message = '';
    this.frmUserSkill.reset();
    Object.keys(this.frmUserSkill.controls).forEach((key: string) => {
      const control = this.frmUserSkill.get(key) as FormGroup;
      control.setErrors(null);
    });
  }

  get f(){
      return this.frmUserSkill.controls;
  }
}
