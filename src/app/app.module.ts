import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient , HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Services
import { IdentityService } from './services/identity.service';
import { UserService } from './services/user.service';
import { ApplicationService } from './services/application.service';
import { LaborerService } from './services/laborer.service';
import { ToastService } from './services/toast.service';
import { ModalService } from './services/modal.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import {OverlayModule} from '@angular/cdk/overlay';

import {
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
} from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Interceptor
import { LoadingInterceptor } from './loading.interceptor';
import { RotatorComponent } from './components/common/rotator/rotator.component';

// Identity
import { LoginComponent } from './components/identity/login/login.component';
import { RegisterComponent } from './components/identity/register/register.component';
import { ChangepasswordComponent } from './components/identity/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './components/identity/forgotpassword/forgotpassword.component';
import { TenantComponent } from './components/tenant/tenant.component';
import { CustomerComponent } from './components/tenant/customer/customer.component';
import { LaborerComponent } from './components/tenant/laborer/laborer.component';
import { UserComponent } from './components/user/user.component';
import { UseraddressComponent } from './components/user/useraddress/useraddress.component';
import { UserbankcardComponent } from './components/user/userbankcard/userbankcard.component';
import { UserbankcardsComponent } from './components/user/userbankcards/userbankcards.component';
import { UserdetailsComponent } from './components/user/userdetails/userdetails.component';
import { UserdocumentsComponent } from './components/user/userdocuments/userdocuments.component';
import { UserqualificationComponent } from './components/user/userqualification/userqualification.component';
import { UserqualificationsComponent } from './components/user/userqualifications/userqualifications.component';
import { UserskillComponent } from './components/user/userskill/userskill.component';
import { UserskillsComponent } from './components/user/userskills/userskills.component';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { DisclaimerAndConsentComponent } from './components/common/disclaimer-and-consent/disclaimer-and-consent.component';
import { UserdocumentComponent } from './components/user/userdocument/userdocument.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AttachmentComponent } from './components/common/attachment/attachment.component';
import { CustomerUserComponent } from './components/user/customer-user/customer-user.component';
import { LaborerUserComponent } from './components/user/laborer-user/laborer-user.component';
import { QuestionComponent } from './components/common/modals/question/question.component';
import { ViewComponent } from './components/common/modals/view/view.component';
import { ChooseComponent } from './components/common/modals/choose/choose.component';
import { SelectComponent } from './components/common/modals/select/select.component';
import { MessageComponent } from './components/common/modals/message/message.component';
import { InterestsPipe } from './pipes/interests.pipe';
import { CustomerHomeDetailsComponent } from './components/tenant/customer/customer-home-details/customer-home-details.component';
import { LaborerHomeDetailsComponent } from './components/tenant/laborer/laborer-home-details/laborer-home-details.component';
import { HomeEventsComponent } from './components/tenant/home-events/home-events.component';
import { TenantAccountComponent } from './components/tenant/tenant-account/tenant-account.component';
import { TenantProfileComponent } from './components/tenant/tenant-profile/tenant-profile.component';
import { TenantFriendsComponent } from './components/tenant/tenant-friends/tenant-friends.component';
import { TenantFriendComponent } from './components/tenant/tenant-friend/tenant-friend.component';
import { TenantMessagingComponent } from './components/tenant/tenant-messaging/tenant-messaging.component';
import { TenantRequestComponent } from './components/tenant/tenant-request/tenant-request.component';
import { TenantRequestsComponent } from './components/tenant/tenant-requests/tenant-requests.component';
import { TenantActivitiesComponent } from './components/tenant/tenant-activities/tenant-activities.component';
import { TenantCalendarComponent } from './components/tenant/tenant-calendar/tenant-calendar.component';
import { LaborerSearchComponent } from './components/tenant/laborer-search/laborer-search.component';
import { CustomerSearchComponent } from './components/tenant/customer-search/customer-search.component';

@NgModule({
  declarations: [
    InterestsPipe,
    AppComponent,
    LoginComponent,
    RotatorComponent,
    RegisterComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    TenantComponent,
    CustomerComponent,
    LaborerComponent,
    UserComponent,
    UseraddressComponent,
    UserbankcardComponent,
    UserbankcardsComponent,
    UserdetailsComponent,
    UserdocumentsComponent,
    UserqualificationComponent,
    UserqualificationsComponent,
    UserskillComponent,
    UserskillsComponent,
    PageNotFoundComponent,
    DisclaimerAndConsentComponent,
    UserdocumentComponent,
    AttachmentComponent,
    CustomerUserComponent,
    LaborerUserComponent,
    RotatorComponent,
    QuestionComponent,
    ViewComponent,
    ChooseComponent,
    SelectComponent,
    MessageComponent,
    InterestsPipe,
    CustomerHomeDetailsComponent,
    LaborerHomeDetailsComponent,
    HomeEventsComponent,
    TenantAccountComponent,
    TenantProfileComponent,
    TenantFriendsComponent,
    TenantFriendComponent,
    TenantMessagingComponent,
    TenantRequestComponent,
    TenantRequestsComponent,
    TenantActivitiesComponent,
    TenantCalendarComponent,
    LaborerSearchComponent,
    CustomerSearchComponent,
  ],
  imports: [
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTabsModule,
    MatTooltipModule,
    MatTreeModule,
    OverlayModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarLabel, 
    MatSnackBarActions, 
    MatSnackBarAction
  ],
  providers: [provideHttpClient(), ApplicationService, ModalService, IdentityService, LaborerService, UserService, ToastService,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    },
    DatePipe,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
