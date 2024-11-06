import { Component, ViewChild } from '@angular/core';
import { UserdetailsComponent } from '../userdetails/userdetails.component';
import { UseraddressComponent } from '../useraddress/useraddress.component';
import { UserdocumentComponent } from '../userdocument/userdocument.component';
import { UserbankcardComponent } from '../userbankcard/userbankcard.component';
import { MatStepper } from '@angular/material/stepper';
import { UserskillComponent } from '../userskill/userskill.component';
import { UserqualificationComponent } from '../userqualification/userqualification.component';
import { UserdocumentsComponent } from '../userdocuments/userdocuments.component';
import { UserbankcardsComponent } from '../userbankcards/userbankcards.component';
import { UserskillsComponent } from '../userskills/userskills.component';
import { UserqualificationsComponent } from '../userqualifications/userqualifications.component';

@Component({
  selector: 'app-laborer-user',
  templateUrl: './laborer-user.component.html',
  styleUrl: '../userStyle.css'
})
export class LaborerUserComponent {
  @ViewChild('UserdetailsComponent') UserdetailsComponent: UserdetailsComponent = {} as UserdetailsComponent;
  @ViewChild('UseraddressComponent') UseraddressComponent: UseraddressComponent = {} as UseraddressComponent;
  @ViewChild('UserdocumentsComponent') UserdocumentsComponent: UserdocumentsComponent = {} as UserdocumentsComponent;

  @ViewChild('UserskillsComponent') UserskillsComponent: UserskillsComponent = {} as UserskillsComponent;
  @ViewChild('UserqualificationsComponent') UserqualificationsComponent: UserqualificationsComponent = {} as UserqualificationsComponent;

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

  get frmUserSkill() {
    console.log("frmUserSkill");
    return this.UserskillsComponent.frmUserSkill;
  }

  get frmUserQualification() {
    console.log("frmUserQualification");
    return this.UserqualificationsComponent.frmUserQualification;
  }

  get frmDocument() {
    console.log("frmDocument");
    return this.UserdocumentsComponent.frmDocument;
  }

  get frmBankCard() {
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
