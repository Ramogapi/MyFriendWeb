import { Component, ViewChild } from '@angular/core';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { UseraddressComponent } from '../useraddress/useraddress.component';
import { MatStepper } from '@angular/material/stepper';
import { UserdocumentsComponent } from '../userdocuments/userdocuments.component';
import { UserbankcardsComponent } from '../userbankcards/userbankcards.component';

@Component({
  selector: 'app-customer-user',
  templateUrl: './customer-user.component.html',
  styleUrl: '../userStyle.css'
})
export class CustomerUserComponent {
  @ViewChild('UserdetailsComponent') UserdetailsComponent: UserdetailsComponent = {} as UserdetailsComponent;
  @ViewChild('UseraddressComponent') UseraddressComponent: UseraddressComponent = {} as UseraddressComponent;
  @ViewChild('UserdocumentsComponent') UserdocumentsComponent: UserdocumentsComponent = {} as UserdocumentsComponent;
  @ViewChild('UserbankcardsComponent') UserbankcardsComponent: UserbankcardsComponent = {} as UserbankcardsComponent;
  @ViewChild("stepper", { static: false }) stepper: MatStepper = {} as MatStepper;

  get frmUserDetails() {
    console.log("frmUserDetails");
    return this.UserdetailsComponent.frmUserDetails;
  }

  get frmUserAddress() {
    console.log("frmUserAddress");
    return this.UseraddressComponent.frmUserAddress;
  }

  get frmDocuments() {
    console.log("frmDocument");
    return this.UserdocumentsComponent.frmDocument;
  }

  get frmBankCards() {
    console.log("frmBankCard");
    return this.UserbankcardsComponent.frmBankCard;
  }

  goToNextStep() {
    this.stepper.next();
  }

  goToPreviousStep() {
    this.stepper.previous();
  }
}
