import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Common
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { DisclaimerAndConsentComponent } from './components/common/disclaimer-and-consent/disclaimer-and-consent.component';

// Identity
import { LoginComponent } from './components/identity/login/login.component';
import { RegisterComponent } from './components/identity/register/register.component';
import { ChangepasswordComponent } from './components/identity/changepassword/changepassword.component';
import { ForgotpasswordComponent } from './components/identity/forgotpassword/forgotpassword.component';

// Tenant
import { TenantComponent } from './components/tenant/tenant.component';
import { CustomerComponent } from './components/tenant/customer/customer.component';
import { LaborerComponent } from './components/tenant/laborer/laborer.component';

// User
import { CustomerUserComponent } from './components/user/customer-user/customer-user.component';
import { LaborerUserComponent } from './components/user/laborer-user/laborer-user.component';
import { UserComponent } from './components/user/user.component';

// Customer
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

// Laborer
import { CustomerSearchComponent } from './components/tenant/customer-search/customer-search.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'update-password', component: ChangepasswordComponent },
  { path: 'h', component: TenantComponent,
    children :[
             { path:'c', component: CustomerComponent },
             { path:'l', component: LaborerComponent },
             { path:'tenant-account', component: TenantAccountComponent },
             { path:'tenant-profile', component: TenantProfileComponent },
             { path:'tenant-friends', component: TenantFriendsComponent },
             { path:'tenant-friend', component: TenantFriendComponent },
             { path:'tenant-messaging', component: TenantMessagingComponent },
             { path:'tenant-request', component: TenantRequestComponent },
             { path:'tenant-requests', component: TenantRequestsComponent },
             { path:'tenant-activities', component: TenantActivitiesComponent },
             { path:'tenant-calendar', component: TenantCalendarComponent },
             { path:'laborer-search', component: LaborerSearchComponent },
             { path:'customer-search', component: CustomerSearchComponent }
  ]},
  { path: 'registration', component: UserComponent,
    children :[
      { path: 'customer', component: CustomerUserComponent },
      { path: 'laborer', component: LaborerUserComponent }] 
  },
  { path: 'disclaimer-and-consent', component: DisclaimerAndConsentComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
