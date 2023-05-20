import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, AfterViewInit {

  notificationsList: any[] = [];
  newList: any[] = [];
  readList: any[] = [];
  notverifiedUsersList: any[] = [];
  notoficationsLoading: boolean = false;
  notVerifiedLoading: boolean = false;
  verifyResponse: any = {};
  totalCount!: string;

  constructor(private indexService: IndexService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.getNotifications();
    this.getNotVerifiedUsers();
  }

  ngAfterViewInit(): void {

  }

  getNotifications(): void {
    this.notoficationsLoading = true;
    this.indexService.get('api/user/notifications').subscribe((response) => {
      this.notificationsList = response;
      this.newList = this.notificationsList.filter(obj => obj.status === 1);
      this.readList = this.notificationsList.filter(obj => obj.status === 0);
      this.notoficationsLoading = false;
      this.commonService.changeAlertCount((this.newList.length + this.notverifiedUsersList.length).toString());
      localStorage.setItem('notification-count', (this.newList.length + this.notverifiedUsersList.length).toString());
    }, (error) => {
      console.log(error);
    });
  }

  getNotVerifiedUsers(): void {
    this.notVerifiedLoading = true;
    this.indexService.get('api/user/not-verified-users').subscribe((response) => {
      this.notverifiedUsersList = response;
      this.notVerifiedLoading = false;
      this.commonService.changeAlertCount((this.newList.length + this.notverifiedUsersList.length).toString());
      localStorage.setItem('notification-count', (this.newList.length + this.notverifiedUsersList.length).toString());
    }, (error) => {
      console.log(error);
    });
  }

  updateNotificationStatus(notification: any): void {
    this.indexService.put(`api/user/${parseInt(notification.id, 10)}/update-notification-status`).subscribe((response) => {
      this.getNotifications();
    }, (error) => {
      console.log(error);
    });
  }

  verifyUser(user: any): void {
    this.indexService.put(`api/user/${user.id}/verify-user`).subscribe((response) => {
      this.getNotVerifiedUsers();
    }, (error) => {
      console.log(error);
    });
  }

  rejectUser(user: any): void {
    this.indexService.put(`api/user/${user.id}/reject-user`).subscribe((response) => {
      this.getNotVerifiedUsers();
    }, (error) => {
      console.log(error);
    });
  }

}
