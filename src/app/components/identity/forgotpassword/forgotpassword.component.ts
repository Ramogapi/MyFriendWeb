import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ForgotPassword } from '../../../models/Identity/forgotpassword';
import { IdentityService } from '../../../services/identity.service';
import { StorageService } from '../../../services/storage.service';
import { Success } from '../../../models/Response/success';
import { CodeLookUp } from '../../../models/LookUp/codelookup';
import { CodeLookUpResponse } from '../../../models/LookUp/codelookupresponse';
import { Failure } from '../../../models/Response/failure';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrl: '../identityStyle.css'
})
export class ForgotpasswordComponent {
  public model : ForgotPassword = new ForgotPassword();

  submitForm: FormGroup = {} as FormGroup;
  message: String = '';
  credentialTypes: CodeLookUp[] = [];
  constructor(private identityService: IdentityService, private tokenService: StorageService,
    private router: Router, private formBuilder: FormBuilder) {
      this.createForm();
  }

  createForm() {
      this.submitForm = this.formBuilder.group({
         username: ['', Validators.required],
         credentialTypeCode: ['', Validators.required]
      });
  }

  submitted = false;

  ngOnInit() {
    this.identityService.getCredentialTypes().subscribe((result: CodeLookUpResponse) => {
      this.credentialTypes = result.response;
    },error=>{
      let failure = error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public submit() {
    console.log('model: ' + JSON.stringify(this.model));
    
    this.submitted = true;
    if(this.submitForm.invalid){
        return;
    }
    this.identityService.forgotPassword(this.model)
               .subscribe(result=>{
                let success = result as Success;
                console.log("success: " +  JSON.stringify(success));

                this.router.navigate(['/']);             
               },error=>{
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
  }

  get f(){
      return this.submitForm.controls;
  }
}
