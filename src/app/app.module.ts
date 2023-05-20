import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { PermenantStaffComponent } from './authentication/signup/permenant-staff/permenant-staff.component';
import { CasualStaffComponent } from './authentication/signup/casual-staff/casual-staff.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { NavbarComponent } from './authentication/navbar/navbar.component';
import { NoAccessComponent } from './errors/no-access/no-access.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { DashboardNavbarComponent } from './dasboard/dashboard-navbar/dashboard-navbar.component';
import { AllUsersComponent } from './dasboard/all-users/all-users.component';
import { SummaryComponent } from './dasboard/summary/summary.component';
import { PaySlipsComponent } from './dasboard/pay-slips/pay-slips.component';
import { RostersComponent } from './dasboard/rosters/rosters.component';
import { DocumentsComponent } from './dasboard/documents/documents.component';
import { AllPaySlipsComponent } from './dasboard/pay-slips/all-pay-slips/all-pay-slips.component';
import { AllRostersComponent } from './dasboard/rosters/all-rosters/all-rosters.component';
import { FeedbackComponent } from './dasboard/feedback/feedback.component';

import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { environment } from 'src/environments/environment';
import { SafePipe } from './pipes/safe.pipe';
import { AdminsComponent } from './dasboard/admins/admins.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    PermenantStaffComponent,
    CasualStaffComponent,
    DasboardComponent,
    NavbarComponent,
    NoAccessComponent,
    NotFoundComponent,
    DashboardNavbarComponent,
    AllUsersComponent,
    SummaryComponent,
    PaySlipsComponent,
    RostersComponent,
    DocumentsComponent,
    AllPaySlipsComponent,
    AllRostersComponent,
    FeedbackComponent,
    SafePipe,
    AdminsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [{ provide: RECAPTCHA_SETTINGS, useValue: { siteKey: environment.recaptcha.siteKey } as RecaptchaSettings }],
  bootstrap: [AppComponent]
})
export class AppModule { }
