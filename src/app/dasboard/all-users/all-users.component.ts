import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  @ViewChild('payslips') payslips!: TemplateRef<any>;
  @ViewChild('roster') roster!: TemplateRef<any>;
  @ViewChild('feedback') feedback!: TemplateRef<any>;
  @ViewChild('adminAdd') adminAdd!: TemplateRef<any>;

  adminUsersList: any[] = [];
  permanentUsersList: any[] = [];
  casualUsersList: any[] = [];

  adminLoading: boolean = false;
  permanentLoading: boolean = false;
  casualLoading: boolean = false;

  isPayslipClick: boolean = false;
  isRosterClick: boolean = false;
  isFeedbackClick: boolean = false;
  isAdminClick: boolean = false;
  isOptionsPanelOpen: boolean = false;
  template!: TemplateRef<any>;
  userId!: string;
  userInfo: any = {}

  constructor(private indexService: IndexService, public auth: AuthService) { }

  ngOnInit(): void {
    this.getAdminUsers();
    this.getPermanentUsers();
    this.getCasualUsers();
  }

  getAdminUsers(): void {
    this.adminLoading = true;
    this.indexService.get('api/User/admin-staff').subscribe((response) => {
      this.adminUsersList = response;
      this.adminLoading = false;
    }, (error) => {
      console.log(error);
    });
  }

  getPermanentUsers(): void {
    this.permanentLoading = true;
    this.indexService.get('api/User/permanent-staff').subscribe((response) => {
      this.permanentUsersList = response;
      this.permanentLoading = false;
    }, (error) => {
      console.log(error);
    });
  }
  getCasualUsers(): void {
    this.casualLoading = true;
    this.indexService.get('api/User/casual-staff').subscribe((response) => {
      this.casualUsersList = response;
      this.casualLoading = false;
    }, (error) => {
      console.log(error);
    });
  }

  showPayslips(user: any): void {
    this.isPayslipClick = true;
    this.userInfo = { id: user.id, name: user.name };
    this.template = this.payslips;
  }

  showRosters(user: any): void {
    this.isRosterClick = true;
    this.userInfo = { id: user.id, name: user.name };
    this.template = this.roster;
  }

  showFeedback(user: any): void {
    this.isFeedbackClick = true;
    this.userInfo = { id: user.id, name: user.name };
    this.template = this.feedback;
  }

  showAddAdmin(): void {
    this.isAdminClick = true;
    this.template = this.adminAdd;
  }

}
