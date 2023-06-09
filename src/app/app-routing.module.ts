import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { PermenantStaffComponent } from './authentication/signup/permenant-staff/permenant-staff.component';
import { CasualStaffComponent } from './authentication/signup/casual-staff/casual-staff.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { AuthGuard } from './services/guards/auth.guard';
import { NoAccessComponent } from './errors/no-access/no-access.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AllUsersComponent } from './dasboard/all-users/all-users.component';
import { SummaryComponent } from './dasboard/summary/summary.component';
import { DocumentsComponent } from './dasboard/documents/documents.component';
import { AllPaySlipsComponent } from './dasboard/pay-slips/all-pay-slips/all-pay-slips.component';
import { AllRostersComponent } from './dasboard/rosters/all-rosters/all-rosters.component';
import { CasualGuard } from './services/guards/casual.guard';
import { PermanentGuard } from './services/guards/permanent.guard';
import { YourDocsComponent } from './dasboard/documents/your-docs/your-docs.component';
import { AllDocsComponent } from './dasboard/documents/all-docs/all-docs.component';
import { NotificationsComponent } from './dasboard/notifications/notifications.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      { path: '', redirectTo: 'permenant-staff', pathMatch: 'full' },
      { path: 'permenant-staff', component: PermenantStaffComponent },
      { path: 'casual-staff', component: CasualStaffComponent }
    ],
  },
  {
    path: 'main',
    component: DasboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: SummaryComponent },
      { path: 'all-users', component: AllUsersComponent },
      { path: 'pay-slips', component: AllPaySlipsComponent },
      { path: 'rosters', component: AllRostersComponent },
      {
        path: 'documents',
        component: DocumentsComponent,
        children: [
          { path: '', redirectTo: 'your-documents', pathMatch: 'full' },
          { path: 'your-documents', component: YourDocsComponent },
          { path: 'all-documents', component: AllDocsComponent }
        ]
      },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'no-access', component: NoAccessComponent },
      { path: 'not-found', component: NotFoundComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
