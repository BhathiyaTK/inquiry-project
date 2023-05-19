import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-pay-slips',
  templateUrl: './pay-slips.component.html',
  styleUrls: ['./pay-slips.component.css']
})
export class PaySlipsComponent implements OnInit {
  @Input('userInfo') userInfo!: any;
  @Output() newPayslipAdd = new EventEmitter<boolean>();

  hoursList: any[] = [];
  paySlipForm!: FormGroup;
  isAdding: boolean = false;
  isAlertShow: boolean = false;
  payslipAddResponse: any = {};

  constructor(private fb: FormBuilder, private indexService: IndexService) { }

  ngOnInit(): void {
    for (let index = 1; index < 160; index++) {
      this.hoursList.push({ key: index, value: index });
    }

    this.paySlipForm = this.fb.group({
      workHours: ['', [Validators.required]]
    });
  }

  addPayslip(): void {
    const obj = {
      workHours: parseInt(this.paySlipForm.get('workHours')?.value, 10)
    };
    this.indexService.post(`api/user/${parseInt(this.userInfo.id ?? this.userInfo.userId, 10)}/pay-slips`, obj).subscribe((response) => {
      if (this.userInfo.userId) {
        this.newPayslipAdd.emit(true);
      }
      this.payslipAddResponse = response;
      this.isAlertShow = true;
      this.paySlipForm.reset();
      this.isAdding = false;
      setTimeout(() => {
        this.isAlertShow = false;
      }, 4000);
    }, (error) => {
      console.log(error);
      this.isAdding = false;
    });
  }

}
