import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-rosters',
  templateUrl: './rosters.component.html',
  styleUrls: ['./rosters.component.css']
})
export class RostersComponent implements OnInit {
  @Input('userInfo') userInfo!: any;
  @Output() newRosterAdd = new EventEmitter<boolean>();

  rosterForm!: FormGroup;
  isAdding: boolean = false;
  isAlertShow: boolean = false;
  rosterResponse: any = {};
  minDate!: string;
  maxDate!: string;
  rosterList: any[] = [];

  constructor(private fb: FormBuilder, private indexService: IndexService, private commonService: CommonService) { }

  ngOnInit(): void {
    this.minDate = this.commonService.setWeekStartingDate(new Date()).toJSON().slice(0, -5);
    this.maxDate = new Date(new Date(this.commonService.setWeekStartingDate(new Date())).getTime() + 12096e5).toJSON().slice(0, -5);

    this.rosterForm = this.fb.group({
      fromDateTime: ['', [Validators.required]],
      toDateTime: ['', [Validators.required]]
    });
  }

  createRosterList(roster: any): void {
    const formatterRoster = {
      fromDateTime: new Date(roster.fromDateTime).toISOString(),
      toDateTime: new Date(roster.toDateTime).toISOString()
    }
    this.rosterList.push(formatterRoster);
  }

  removeRoster(index: number): void {
    this.rosterList.splice(index, 1);
  }

  addRoster(): void {
    const obj = {
      dateTime: this.rosterList
    };
    this.indexService.post(`api/user/${parseInt(this.userInfo.id ?? this.userInfo.userId, 10)}/roster`, obj).subscribe((response) => {
      if (this.userInfo.userId) {
        this.newRosterAdd.emit(true);
      }
      this.rosterResponse = response;
      this.isAlertShow = true;
      this.rosterForm.reset();
      this.isAdding = false;
      this.rosterList = [];
      setTimeout(() => {
        this.isAlertShow = false;
      }, 4000);
    }, (error) => {
      console.log(error);
      this.isAdding = false;
    });
  }

}
