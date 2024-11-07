import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Qualification } from '../../../models/User/Qualification/qualification';
import { CodeLookUp } from '../../../models/LookUp/codelookup';
import { IdentityService } from '../../../services/identity.service';
import { StorageService } from '../../../services/storage.service';
import { LaborerService } from '../../../services/laborer.service';
import { ToastService } from '../../../services/toast.service';
import { CodeLookUpResponse } from '../../../models/LookUp/codelookupresponse';
import { Failure } from '../../../models/Response/failure';
import { Success } from '../../../models/Response/success';
import { UserQualification } from '../../../models/User/Qualification/userqualification';
import { DatePipe } from '@angular/common';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Constants } from '../../../models/constants';

const moment = _rollupMoment || _moment;

export const DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: Constants.DATE_ONLY,
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-userqualification',
  templateUrl: './userqualification.component.html',
  styleUrl: '../userStyle.css',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
})
export class UserqualificationComponent implements OnInit {
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
  @Output("ngOnInit") reload: EventEmitter<any> = new EventEmitter();

  today = new Date();

  start = new FormControl(moment());
  end = new FormControl(moment());

  frmUserQualification: FormGroup = {} as FormGroup;
  public model: Qualification = new Qualification();
  message: String = '';
  professions: CodeLookUp[] = [];
  qualificationStatus: CodeLookUp[] = [];
  constructor(private identityService: IdentityService, 
    private storageService: StorageService, private laborerService: LaborerService,
    private toastService: ToastService, private formBuilder: FormBuilder, private datePipe: DatePipe) {
      this.createForm();
  }

  createForm() {
      this.frmUserQualification = this.formBuilder.group({
        professionCode: ['', Validators.required],
        name: ['', Validators.required],
        start: ['', Validators.required],
        end: ['', Validators.required],
        institution: ['', Validators.required],
        uniqueIdentifier: ['', Validators.required],
        qualificationStatusCode: ['', Validators.required],
        description: ['', Validators.required]
      });
  }

  submitted = false;

  ngOnInit() {
    this.frmUserQualification.get('start')?.setValue('');
    this.frmUserQualification.get('end')?.setValue('');
    this.identityService.getCodeLookUps('Profession').subscribe((result: CodeLookUpResponse) => {
      this.professions = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
    this.identityService.getCodeLookUps('Qualification Status').subscribe((result: CodeLookUpResponse) => {
      this.qualificationStatus = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public submit() {
    debugger;
    let user = JSON.parse(this.storageService.getUser()) as Success;
    this.model.workerId = user.response.value.id;

    console.log('model: ' + JSON.stringify(this.model));
    
    this.submitted = true;

    if(this.model.id > 0){
      this.laborerService.updateQualification(this.model)
               .subscribe(result=>{
                debugger;
                this.refresh();
                let success = result as Success;
                console.log("success: " + JSON.stringify(success));
                this.toastService.success('Qualification successfully saved!');
               },error=>{
                debugger;
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
    } else {
      this.laborerService.createQualification(this.model)
               .subscribe(result=>{
                debugger;
                this.refresh();
                let success = result as Success;
                console.log("success: " + JSON.stringify(success));
                this.toastService.success('Qualification successfully saved!');
               },error=>{
                debugger;
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
    }
  }

  view(id : number) {
    this.laborerService.getQualification(id).subscribe((result: UserQualification) => {
      this.model = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public refresh(){
    this.reload.emit();
    this.message = '';
    this.frmUserQualification.reset();
    Object.keys(this.frmUserQualification.controls).forEach((key: string) => {
      const control = this.frmUserQualification.get(key) as FormGroup;
      control.setErrors(null);
    });
  }

  get f(){
      return this.frmUserQualification.controls;
  }
}
