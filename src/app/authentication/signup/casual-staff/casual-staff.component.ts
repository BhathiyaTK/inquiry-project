import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-casual-staff',
  templateUrl: './casual-staff.component.html',
  styleUrls: ['./casual-staff.component.css']
})
export class CasualStaffComponent implements OnInit {

  casualStaffSignUpForm!: FormGroup;
  recaptchaForm!: FormGroup;
  isSignInProcessing: boolean = false;
  isAlertShow: boolean = false;
  signupResponse: any = {};
  token: string | undefined;

  constructor(
    private fb: FormBuilder,
    private indexService: IndexService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recaptchaForm = this.fb.group({
      recaptcha: [null, [Validators.required]]
    });
    this.casualStaffSignUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  recaptchaResolved(response: string | undefined): void {
    this.token = response;
  }

  casualStaffSignUp(): void {
    this.isSignInProcessing = true;
    this.indexService.post('api/auth/casual-account', this.casualStaffSignUpForm.value).subscribe((response) => {
      this.signupResponse = response;
      this.isAlertShow = true;
      this.casualStaffSignUpForm.reset();
      this.isSignInProcessing = false;
      setTimeout(() => {
        this.isAlertShow = false;
      }, 4000);
    }, (error) => {
      console.log(error);
      this.isSignInProcessing = false;
    });
  }

}
