import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  recaptchaForm!: FormGroup;
  signinProcessing: boolean = false;
  token: string | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.recaptchaForm = this.fb.group({
      recaptcha: [null, [Validators.required]]
    });
    this.signinForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  recaptchaResolved(response: string | undefined): void {
    this.token = response;
  }

  login(): void {
    this.signinProcessing = true;
    this.auth.userLogin(this.signinForm.value).subscribe((response) => {
      let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
      let jwtH = new JwtHelperService();
      let decoded = jwtH.decodeToken(response.jwt);
      this.route.navigate([returnUrl || '/main']);
      this.signinProcessing = false;
    }, (error) => {
      console.log(error);
    });
  }

}
