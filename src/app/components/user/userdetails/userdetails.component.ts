import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CodeLookUp } from '../../../models/LookUp/codelookup';
import { CodeLookUpResponse } from '../../../models/LookUp/codelookupresponse';
import { IdentityService } from '../../../services/identity.service';
import { StorageService } from '../../../services/storage.service';
import { Failure } from '../../../models/Response/failure';
import { Register } from '../../../models/Identity/register';
import { Access } from '../../../models/Response/access';
import { Success } from '../../../models/Response/success';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';
import { Favourite } from '../../../models/favourite';
import { UserService } from '../../../services/user.service';
import { Interest } from '../../../models/User/Interest/interest';
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
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: '../userStyle.css',
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: DATE_FORMATS},
  ],
})
export class UserdetailsComponent implements OnInit {   
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
   
  public model : Register = new Register();
  public interest : Interest = new Interest();

  today = new Date();

  dateOfBirth = new FormControl(moment());
  frmUserDetails: FormGroup = {} as FormGroup;
  message: String = '';
  user : Access = new Access();
  genders: CodeLookUp[] = [];
  countries: CodeLookUp[] = [];
  credentialTypes: CodeLookUp[] = [];
  favourites: Favourite[] = [];
  constructor(private identityService: IdentityService, private tokenService: StorageService,
    private router: Router, private formBuilder: FormBuilder, private toastService: ToastService,
    private userService: UserService, private datePipe: DatePipe) {
      this.createForm();
  }

  createForm() {
      this.frmUserDetails = this.formBuilder.group({
        fullname: ['', Validators.required],
        password: ['', Validators.required],
        identityNumber: ['', Validators.required],
        email: ['', Validators.required],
        cellphone: ['', Validators.required],
        genderCode: ['', Validators.required],
        credentialTypeCode: ['', Validators.required],
        biography: ['', Validators.required],
        dateOfBirth: ['', Validators.required]
      });
  }

  ngOnInit() {
    this.frmUserDetails.get('dateOfBirth')?.setValue('');
    const storedInterests = localStorage.getItem('interests');
    if (storedInterests) {
        this.favourites = JSON.parse(storedInterests);
    }
    this.identityService.getCodeLookUps('Gender').subscribe((result: CodeLookUpResponse) => {
      this.genders = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
    this.identityService.getCodeLookUps('Country').subscribe((result: CodeLookUpResponse) => {
      this.countries = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
    this.identityService.getCredentialTypes().subscribe((result: CodeLookUpResponse) => {
      this.credentialTypes = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public submit() {    
    var roleCode = this.router.url.indexOf('customer') > -1 ? 'C': 'L';
    this.model.roleCode = roleCode;
    console.log('model: ' + JSON.stringify(this.model));

    this.model.dateOfBirth = this.dateOfBirth.value?.format(Constants.DATE_ONLY);

    this.identityService.register(this.model)
               .subscribe(result=>{
                debugger;
                let success = result as Success;
                this.tokenService.saveToken(success.response.value.token);
                this.tokenService.saveUser(success);
                this.interest.userId = success.response.value.id;
                this.saveInterests();
               },error=>{
                debugger;
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
  }

  public saveInterests(){
    this.interest.professionCodes = [];
    this.favourites.forEach((key) => {
      this.interest.professionCodes.push(key.code);
    });
    this.userService.createUserInterests(this.interest)
               .subscribe(result=>{
                localStorage.setItem('interests', '');
                this.toastService.success('Details successfully saved!');
                this.goToNextStep.emit();
               },error=>{
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
  }
}