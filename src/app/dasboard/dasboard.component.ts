import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserTypes } from '../enums/user-types';

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
    { title: 'All Users', url: 'all-users', isVisible: true },
    { title: 'Pay Slips', url: 'pay-slips', isVisible: true },
    { title: 'Rosters', url: 'rosters', isVisible: true },
    { title: 'Documents', url: 'documents', isVisible: true },
  ];
  updatedLinks: any[] = [];

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.auth.currentUser;
    this.sideLinks.forEach((link) => {
      if (link.url === 'pay-slips' && this.auth.currentUser.userRole === '1') {
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

}
