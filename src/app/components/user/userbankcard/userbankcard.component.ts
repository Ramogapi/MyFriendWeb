import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BankCard } from '../../../models/User/BankCard/bankcard';
import { ToastService } from '../../../services/toast.service';
import { Success } from '../../../models/Response/success';
import { UserService } from '../../../services/user.service';
import { Failure } from '../../../models/Response/failure';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { UserBankCard } from '../../../models/User/BankCard/userbankcard';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-userbankcard',
  templateUrl: './userbankcard.component.html',
  styleUrl: '../userStyle.css'
})
export class UserbankcardComponent implements OnInit {
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
  @Output("ngOnInit") reload: EventEmitter<any> = new EventEmitter();
  frmBankCard: FormGroup = {} as FormGroup;
  public model : BankCard = new BankCard();
  message: String = '';
  constructor(private userService: UserService, private toastService: ToastService,
    private storageService: StorageService, private router: Router, private formBuilder: FormBuilder) {
      this.createForm();
  }

  createForm() {
      this.frmBankCard = this.formBuilder.group({
        cardNumber: ['', Validators.required],
        expiryDate: ['', Validators.required],
        cvv: ['', Validators.required]
      });
  }

  submitted = false;

  ngOnInit() {

  }

  view(id : number) {
    this.userService.getBankCard(id).subscribe((result: UserBankCard) => {
      this.model = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public refresh(){
    this.reload.emit();
    this.message = '';
    this.frmBankCard.reset();
    Object.keys(this.frmBankCard.controls).forEach((key: string) => {
      const control = this.frmBankCard.get(key) as FormGroup;
      control.setErrors(null);
    });
  }

  public submit() {
    let user = JSON.parse(this.storageService.getUser()) as Success;
    this.model.userId = user.response.value.id;
    console.log('model: ' + JSON.stringify(this.model));
    
    this.submitted = true;

    if(this.model.id > 0){
      this.userService.updateBankCard(this.model)
               .subscribe(result=>{
                this.refresh();
                let success = result as Success;
                console.log("success: " + JSON.stringify(success));
                this.toastService.success('Bank card successfully saved!');  
                this.ngOnInit();              
               },error=>{
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
    } else {
      this.userService.createBankCard(this.model)
               .subscribe(result=>{
                this.refresh();
                let success = result as Success;
                console.log("success: " + JSON.stringify(success));
                this.toastService.success('Bank card successfully saved!');  
                this.ngOnInit();              
               },error=>{
                let failure = error.error as Failure;
                this.message = failure.message;
                console.log('failure: ' + JSON.stringify(failure));
               });
    }
  }

  get f(){
      return this.frmBankCard.controls;
  }
}
