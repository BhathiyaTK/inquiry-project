import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-permenant-staff',
  templateUrl: './permenant-staff.component.html',
  styleUrls: ['./permenant-staff.component.css']
})
export class PermenantStaffComponent implements OnInit {

  permanentStaffSignUpForm!: FormGroup;
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
    this.permanentStaffSignUpForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  recaptchaResolved(response: string | undefined): void {
    this.token = response;
  }

  permanentStaffSignUp(): void {
    this.isSignInProcessing = true;
    this.indexService.post('api/auth/permanent-account', this.permanentStaffSignUpForm.value).subscribe((response) => {
      this.signupResponse = response;
      this.isAlertShow = true;
      this.permanentStaffSignUpForm.reset();
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
