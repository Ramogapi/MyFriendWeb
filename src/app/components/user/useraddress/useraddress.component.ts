import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAddress } from '../../../models/User/useraddress';
import { UserService } from '../../../services/user.service';
import { Success } from '../../../models/Response/success';
import { ToastService } from '../../../services/toast.service';
import { Failure } from '../../../models/Response/failure';
import { StorageService } from '../../../services/storage.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-useraddress',
  templateUrl: './useraddress.component.html',
  styleUrl: '../userStyle.css'
})
export class UseraddressComponent implements OnInit {
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
  @Output("goToPreviousStep") goToPreviousStep: EventEmitter<any> = new EventEmitter();
  frmUserAddress: FormGroup = {} as FormGroup;
  public model : UserAddress = new UserAddress();
  message: String = '';
  constructor(private userService: UserService, private toastService: ToastService,
     private storageService: StorageService, private formBuilder: FormBuilder) {
      this.createForm();
  }

  createForm() {
      this.frmUserAddress = this.formBuilder.group({
        address: ['', Validators.required],
        gpsCoordinates: ['', Validators.required],
        latitude: ['', Validators.required],
        longitude: ['', Validators.required]
      });
  }

  submitted = false;

  ngOnInit() {

  }

  public back() {
    this.goToPreviousStep.emit();
  }

  public submit() {
    let user = JSON.parse(this.storageService.getUser()) as Success;
    this.model.userId = user.response.id;
    console.log('model: ' + JSON.stringify(this.model));
    
    this.submitted = true;

    this.userService.createAddress(this.model)
               .subscribe(result=>{
                let success = result as Success;
                console.log("success: " + JSON.stringify(success));
                this.toastService.success('Address successfully saved!');
                this.goToNextStep.emit();
               },error=>{
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
  }

  get f(){
      return this.frmUserAddress.controls;
  }
}