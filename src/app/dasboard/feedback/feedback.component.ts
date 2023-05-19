import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit, OnChanges {
  @Input('userInfo') userInfo!: any;

  feedbackForm!: FormGroup;
  isAdding: boolean = false;
  isAlertShow: boolean = false;
  feedbackAddResponse: any = {};
  feedbackId: any = '';

  constructor(private fb: FormBuilder, private indexService: IndexService) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      rating: ['1', [Validators.required]],
      feedback: ['', [Validators.required]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getFeedback();
  }

  getFeedback(): void {
    this.indexService.get(`api/user/${parseInt(this.userInfo.id, 10)}/feedbacks`).subscribe((response) => {
      if (response.length > 0) {
        this.feedbackId = response[0].id
        this.feedbackForm.get('rating')?.setValue(response[0].rating);
        this.feedbackForm.get('feedback')?.setValue(response[0].feedback);
      } else {
        this.feedbackId = null;
        this.feedbackForm.get('rating')?.setValue('1');
        this.feedbackForm.get('feedback')?.setValue('');
      }
    }, (error) => {
      console.log(error);
      this.isAdding = false;
    });
  }

  submitFeedback(isUpdate?: boolean): void {
    let api = null;
    const obj = {
      rating: this.feedbackForm.get('rating')?.value,
      feedback: this.feedbackForm.get('feedback')?.value,
    };
    if (isUpdate) {
      api = this.indexService.put(`api/user/${parseInt(this.feedbackId, 10)}/feedback`, obj);
    } else {
      api = this.indexService.post(`api/user/${parseInt(this.userInfo.id, 10)}/feedback`, obj);
    }
    api.subscribe((response) => {
      console.log(response);
      this.feedbackAddResponse = response;
      this.isAlertShow = true;
      if (!isUpdate) {
        this.feedbackForm.reset();
      }
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
