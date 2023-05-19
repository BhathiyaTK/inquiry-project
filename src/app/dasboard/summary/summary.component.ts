import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  dashboardItems: any[] = [];

  constructor(private indexService: IndexService, private commonService: CommonService) { }

  ngOnInit(): void {

    this.indexService.get('api/User/permanent-staff').subscribe((response) => {
      this.dashboardItems.push({
        icon: 'diversity_3', value: response.length, title: 'Permanent Users', order: 1
      });
    });
    this.indexService.get('api/User/casual-staff').subscribe((response) => {
      this.dashboardItems.push({
        icon: 'group', value: response.length, title: 'Casual Users', order: 2
      });
    });
    this.indexService.get('api/user/pay-slips').subscribe((response) => {
      this.dashboardItems.push({
        icon: 'receipt', value: response.length, title: 'Payslips', order: 3
      });
    });
    this.indexService.get('api/user/rosters').subscribe((response) => {
      this.dashboardItems.push({
        icon: 'calendar_month', value: response.length, title: 'Rosters', order: 4
      });
    });
    this.indexService.get(`api/user/${parseInt(this.commonService.getUserId(), 10)}/documents`).subscribe((response) => {
      this.dashboardItems.push({
        icon: 'description', value: response.length, title: 'Documents', order: 5
      });
    });

  }

}
