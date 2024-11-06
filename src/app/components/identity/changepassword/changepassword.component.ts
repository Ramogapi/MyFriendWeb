import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ChangePassword } from '../../../models/Identity/changepassword';
import { IdentityService } from '../../../services/identity.service';
import { StorageService } from '../../../services/storage.service';
import { Success } from '../../../models/Response/success';
import { FormValidator } from '../../../validators/formvalidator';
import { Failure } from '../../../models/Response/failure';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrl: '../identityStyle.css'
})
export class ChangepasswordComponent {
  public model : ChangePassword = new ChangePassword();

  submitForm: FormGroup = {} as FormGroup;
  message: String = '';
  constructor(private identityService: IdentityService, private tokenService: StorageService,
    private router: Router, private formBuilder: FormBuilder) {
      this.createForm();
  }

  createForm() {
      this.submitForm = this.formBuilder.group({
         password: ['', Validators.required],
         confirmpassword: ['', Validators.required]
      },
      FormValidator.mustMatch('password', 'confirmpassword')
      );
  }

  submitted = false;

  ngOnInit() {

  }

  public submit() {
    console.log('model: ' + JSON.stringify(this.model));
    
    this.submitted = true;
    if(this.submitForm.invalid){
        return;
    }
    this.identityService.changePassword(this.model)
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