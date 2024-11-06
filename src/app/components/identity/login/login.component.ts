import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Login } from '../../../models/Identity/login';
import { Access } from '../../../models/Response/access';
import { IdentityService } from '../../../services/identity.service';
import { StorageService } from '../../../services/storage.service';
import { Success } from '../../../models/Response/success';
import { Failure } from '../../../models/Response/failure';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: '../identityStyle.css'
})
export class LoginComponent {
  public model : Login = new Login();

  submitForm: FormGroup = {} as FormGroup;
  message: String = '';
  user : Access = new Access();
  constructor(private identityService: IdentityService, private tokenService: StorageService,
    private router: Router, private formBuilder: FormBuilder) {
      this.createForm();
  }

  createForm() {
      this.submitForm = this.formBuilder.group({
         username: ['', Validators.required],
         password: ['', Validators.required]
      });
  }

  submitted = false;

  ngOnInit() {
    //this.tokenService.signOut();
    localStorage.clear();
  }

  public submit() {
    this.submitted = true;
    if(this.submitForm.invalid){
        return;
    }
    this.identityService.login(this.model)
               .subscribe(result=>{
                let success = result as Success;
                this.tokenService.saveToken(success.response.value.token);
                this.tokenService.saveUser(success);

                if(success.response.value.roles[0] == "C"){
                  this.router.navigate(['/h/c']);
                } else if(success.response.value.roles[0] == "L"){
                  this.router.navigate(['/h/l']);
                }              
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
