import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-all-rosters',
  templateUrl: './all-rosters.component.html',
  styleUrls: ['./all-rosters.component.css']
})
export class AllRostersComponent implements OnInit {

  rostersLoading: boolean = false;
  openEditSec: boolean = false;
  rostersList: any[] = [];
  selectedRoster: any = {}
  minDate!: string;
  maxDate!: string;

  rosterUpdateForm!: FormGroup;
  isUpdating: boolean = false;
  isAlertShow: boolean = false;
  rosterUpdateResponse: any = {};

  isOptionsPanelOpen: boolean = false;
  isRosterAdd: boolean = false;
  userInfo: any = {}

  constructor(
    private fb: FormBuilder,
    private indexService: IndexService,
    private commonService: CommonService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.auth.currentUser.userRole === '2') {
      this.getRostersByUserId(this.auth.currentUser.userId);
    } else {
      this.getAllRosters();
    }

    this.rosterUpdateForm = this.fb.group({
      subject: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      fromDateTime: ['', [Validators.required]],
      toDateTime: ['', [Validators.required]],
      rosterId: ['', [Validators.required]],
    });

    this.minDate = this.commonService.setWeekStartingDate(new Date()).toJSON().slice(0, -5);
    this.maxDate = new Date(new Date(this.commonService.setWeekStartingDate(new Date())).getTime() + 12096e5).toJSON().slice(0, -5);
  }

  getAllRosters(): void {
    this.rostersLoading = true;
    let newlist: any[] = [];
    this.indexService.get(`api/user/rosters`).subscribe((response) => {
      this.rostersList = response;
      this.rostersLoading = false;
    });
  }

  getRostersByUserId(id: any): void {
    this.rostersLoading = true;
    this.indexService.get(`api/user/${parseInt(id, 10)}/rosters`).subscribe((response) => {
      // if (response.length < 2 || response.length === undefined) {
      //   this.rostersList.push(response);
      //   console.log(this.rostersList)
      // } else {
      // }
      this.rostersList = response;
      this.rostersLoading = false;
    });
  }

  openRightPanel(obj: any, isEdit: boolean): void {
    this.isOptionsPanelOpen = true;
    if (isEdit) {
      this.openEditSec = true;
      this.selectedRoster = obj;
      this.rosterUpdateForm.get('subject')?.setValue(obj.subject);
      this.rosterUpdateForm.get('unit')?.setValue(obj.unit);
      this.rosterUpdateForm.get('fromDateTime')?.setValue(this.setDateTimeLocalFormat(obj.fromDateTime));
      this.rosterUpdateForm.get('toDateTime')?.setValue(this.setDateTimeLocalFormat(obj.toDateTime));
      this.rosterUpdateForm.get('rosterId')?.setValue(obj.id);
    } else {
      this.isRosterAdd = true;
      this.userInfo = obj;
    }
  }

  updateRoster(): void {
    const obj = {
      dateTime: {
        subject: this.rosterUpdateForm.get('subject')?.value,
        unit: this.rosterUpdateForm.get('unit')?.value,
        fromDateTime: new Date(this.rosterUpdateForm.get('fromDateTime')?.value).toISOString(),
        toDateTime: new Date(this.rosterUpdateForm.get('toDateTime')?.value).toISOString()
      }
    };
    this.indexService.put(`api/user/${parseInt(this.rosterUpdateForm.get('rosterId')?.value, 10)}/roster`, obj).subscribe((response) => {
      console.log(response);
      this.rosterUpdateResponse = response;
      this.isAlertShow = true;
      this.rosterUpdateForm.reset();
      this.isUpdating = false;
      if (this.auth.currentUser.userRole === '2') {
        this.getRostersByUserId(this.auth.currentUser.userId);
      } else {
        this.getAllRosters();
      }
      setTimeout(() => {
        this.isAlertShow = false;
      }, 4000);
    }, (error) => {
      console.log(error);
      this.isUpdating = false;
    });
  }

  setDateTimeLocalFormat(date: string | number | Date): any {
    return new Date(new Date(date).toJSON().slice(0, -1) + '-05:30').toISOString().substring(0, 16);
  }

}
