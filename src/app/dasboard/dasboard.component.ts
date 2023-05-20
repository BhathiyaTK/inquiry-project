import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserTypes } from '../enums/user-types';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrls: ['./dasboard.component.css']
})
export class DasboardComponent implements OnInit {

  currentUser: any;
  currentUserRole!: string;
  sideLinks: any[] = [
    { title: 'Dashboard', url: 'dashboard', isVisible: true },
    { title: 'Users', url: 'all-users', isVisible: true },
    { title: 'Pay Slips', url: 'pay-slips', isVisible: true },
    { title: 'Rosters', url: 'rosters', isVisible: true },
    { title: 'Documents', url: 'documents', isVisible: true },
    { title: 'Notifications & Requests', url: 'notifications', isVisible: true },
  ];
  updatedLinks: any[] = [];
  alerts!: any;

  constructor(public auth: AuthService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.data$.subscribe(res => {
      if (res) {
        this.alerts = res
      } else {
        this.alerts = localStorage.getItem('notification-count');
      }
    });

    this.currentUser = this.auth.currentUser;

    this.sideLinks.forEach((link) => {
      if (link.url === 'pay-slips' && this.auth.currentUser.userRole === '1') {
        link.isVisible = false;
      }
      if (link.url === 'notifications' && this.auth.currentUser.userRole !== '0') {
        link.isVisible = false;
      }
      this.updatedLinks.push(link)
    });

    switch (parseInt(this.auth.currentUser.userRole, 10)) {
      case UserTypes.Admin:
        this.currentUserRole = 'Administrator';
        break;
      case UserTypes.PermanentStaff:
        this.currentUserRole = 'Permanent Staff';
        break;
      case UserTypes.CasualStaff:
        this.currentUserRole = 'Casual Staff';
        break;
      default:
        break;
    }

  }

  setAlertCount(event: any): void {
    this.alerts = event;
    console.log(this.alerts)
  }

}
