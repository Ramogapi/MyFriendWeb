import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BankCard } from '../../../models/User/BankCard/bankcard';
import { StorageService } from '../../../services/storage.service';
import { UserService } from '../../../services/user.service';
import { Success } from '../../../models/Response/success';
import { Failure } from '../../../models/Response/failure';
import { UserBankCards } from '../../../models/User/BankCard/userbankcards';
import { ToastService } from '../../../services/toast.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserbankcardComponent } from '../userbankcard/userbankcard.component';
import { ModalService } from '../../../services/modal.service';
import { Question } from '../../../models/Modals/question';

@Component({
  changeDetection: ChangeDetectionStrategy.Default,
  selector: 'app-userbankcards',
  templateUrl: './userbankcards.component.html',
  styleUrl: '../userStyle.css'
})
export class UserbankcardsComponent implements OnInit {    
  @ViewChild('UserbankcardComponent') UserbankcardComponent: UserbankcardComponent = {} as UserbankcardComponent;
  @Output("goToPreviousStep") goToPreviousStep: EventEmitter<any> = new EventEmitter();
  @Output("goToNextStep") goToNextStep: EventEmitter<any> = new EventEmitter();
  dataSource: BankCard[] = [];
  displayedColumns: string[] = ['cardNumber', 'expiryDate', 'cvv', 'actions'];
  frmBankCard: FormGroup = {} as FormGroup;
  constructor(private userService: UserService, 
    private toastService: ToastService, private modalService: ModalService,
    private storageService: StorageService, private router: Router) {
  }

  submitted = false;

  ngOnInit() {
    let user = JSON.parse(this.storageService.getUser()) as Success;
    this.userService.getBankCards(user.response.id).subscribe((result: UserBankCards) => {
      this.dataSource = result.response;
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
    });
  }

  public back() {
    this.goToPreviousStep.emit();
  }

  public delete(id: number, name: string) {
    const model: Question = {} as Question;
    model.title = 'Delete';
    model.content = 'Are you sure you want to delete <b>"' + name + '"</b>?';
    model.request = () => this.removeBankCard(id);
    this.modalService.question(model);    
  }

  public removeBankCard(id: number) {
    this.userService.deleteBankCard(id).subscribe(result=>{
      this.ngOnInit();
      let success = result as Success;
      console.log("success: " + JSON.stringify(success));
      this.toastService.success('Bank card successfully deleted!');
    },error=>{
      let failure = error.error as Failure;
      console.log('failure: ' + JSON.stringify(failure));
     });    
  }

  public view(id: number) {
    this.UserbankcardComponent.view(id);
  }

  public finish() {
    if(this.router.url.indexOf('customer') > -1)
      this.router.navigate(['/home/customer']);
    else
      this.router.navigate(['/home/laborer']);
  }

  get f(){
      return this.frmBankCard.controls;
  }
}