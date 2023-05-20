import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-all-pay-slips',
  templateUrl: './all-pay-slips.component.html',
  styleUrls: ['./all-pay-slips.component.css']
})
export class AllPaySlipsComponent implements OnInit {

  payslipsLoading: boolean = false;
  openEditSec: boolean = false;
  payslipList: any[] = [];
  selectedPayslip: any = {}
  hoursList: any[] = [];

  paySlipUpdateForm!: FormGroup;
  isUpdating: boolean = false;
  isAlertShow: boolean = false;
  payslipUpdateResponse: any = {};

  isOptionsPanelOpen: boolean = false;
  isPayslipAdd: boolean = false;
  userInfo: any = {}

  constructor(private fb: FormBuilder, private indexService: IndexService, public auth: AuthService) { }

  ngOnInit(): void {
    if (this.auth.currentUser.userRole === '2') {
      this.getPayslipsByUserId(this.auth.currentUser.userId);
    } else {
      this.getPayslips();
    }
    for (let index = 1; index < 160; index++) {
      this.hoursList.push({ key: index, value: index });
    }

    this.paySlipUpdateForm = this.fb.group({
      workHours: ['', [Validators.required]],
      slipId: ['', [Validators.required]],
    });
  }

  getPayslips(): void {
    this.payslipsLoading = true;
    this.indexService.get('api/user/pay-slips').subscribe((response) => {
      this.payslipList = response;
      this.payslipsLoading = false;
    });
  }

  getPayslipsByUserId(id: any): void {
    this.payslipsLoading = true;
    this.indexService.get(`api/user/${parseInt(id, 10)}/pay-slips`).subscribe((response) => {
      if (response.length < 2 || response.length === undefined) {
        this.payslipList.push(response);
      } else {
        this.payslipList = response;
      }
      this.payslipsLoading = false;
    });
  }

  openRightPanel(obj: any, isEdit: boolean): void {
    this.isOptionsPanelOpen = true;
    if (isEdit) {
      this.openEditSec = true;
      this.selectedPayslip = obj;
      this.paySlipUpdateForm.get('workHours')?.setValue(obj.workHours);
      this.paySlipUpdateForm.get('slipId')?.setValue(obj.id);
    } else {
      this.isPayslipAdd = true;
      this.userInfo = obj;
    }
  }

  updatePayslip(): void {
    const obj = {
      workHours: parseInt(this.paySlipUpdateForm.get('workHours')?.value, 10)
    };
    this.indexService.put(`api/user/${parseInt(this.paySlipUpdateForm.get('slipId')?.value, 10)}/pay-slips`, obj).subscribe((response) => {
      this.payslipUpdateResponse = response;
      this.isAlertShow = true;
      this.paySlipUpdateForm.reset();
      this.isUpdating = false;
      if (this.auth.currentUser.userRole === '2') {
        this.getPayslipsByUserId(this.auth.currentUser.userId);
      } else {
        this.getPayslips();
      }
      setTimeout(() => {
        this.isAlertShow = false;
      }, 4000);
    }, (error) => {
      console.log(error);
      this.isUpdating = false;
    });
  }

}
