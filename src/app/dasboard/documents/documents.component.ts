import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from 'src/app/services/common.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  fileUploadForm!: FormGroup;
  selectedFilename: string = '';
  isUploading: boolean = false;
  isAlertShow: boolean = false;
  uploadResponse: any = {};
  documentList: any[] = [];
  file!: File;
  selectFileSrc: any;
  selectFileName: string = '';

  constructor(
    private fb: FormBuilder,
    private indexService: IndexService,
    private commonService: CommonService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getDocuments();

    this.fileUploadForm = this.fb.group({
      files: ['', [Validators.required]]
    });
    this.commonService.getUserId();
  }

  setFilename(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.selectedFilename = this.formatName(this.file.name, 30);
    }
  }

  formatName(filename: string, limit: number): string {
    return this.commonService.formatFileName(filename, limit);
  }

  getDocuments(): void {
    this.indexService.get(`api/user/${parseInt(this.commonService.getUserId(), 10)}/documents`).subscribe((response) => {
      if (response) {
        this.documentList = response;
      }
    });
  }

  getSingleDocument(id: number, name: string): void {
    this.indexService.getBlob(`api/user/documents/${id}`).subscribe((response) => {
      if (response) {
        this.selectFileSrc = URL.createObjectURL(response);
        this.selectFileName = name;
      }
    });
  }

  uploadFile() {
    this.isUploading = true;

    const formData = new FormData();
    formData.append("files", this.file);

    this.indexService.upload(`api/user/${parseInt(this.commonService.getUserId(), 10)}/documents`, formData).subscribe((response) => {
      this.uploadResponse = response;
      this.isAlertShow = true;
      this.isUploading = false;
      this.selectedFilename = '';
      setTimeout(() => {
        this.isAlertShow = false;
      }, 4000);
      this.getDocuments();
    }, (error) => {
      console.log(error);
      this.uploadResponse = error;
      this.isAlertShow = true;
      this.isUploading = false;
    });
  }

  downloadDocument(url: any): void {
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', this.selectFileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
