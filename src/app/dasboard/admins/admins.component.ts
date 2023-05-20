import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  adminForm!: FormGroup;
  isAdding: boolean = false;
  isAlertShow: boolean = false;
  adminAddResponse: any = {};

  constructor(private fb: FormBuilder, private indexService: IndexService) { }

  ngOnInit(): void {
    this.adminForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  addAdmin(): void {
    this.isAdding = true;
    this.indexService.post('api/auth/admin-account', this.adminForm.value).subscribe((response) => {
      this.adminAddResponse = response;
      this.isAlertShow = true;
      this.adminForm.reset();
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
