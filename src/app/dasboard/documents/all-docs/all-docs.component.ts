import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { IndexService } from 'src/app/services/index.service';

@Component({
  selector: 'app-all-docs',
  templateUrl: './all-docs.component.html',
  styleUrls: ['./all-docs.component.css']
})
export class AllDocsComponent implements OnInit {

  allDocumentList: any[] = [];
  selectFileSrc: any;
  selectFileName: string = '';

  constructor(
    private indexService: IndexService,
    private commonService: CommonService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllDocuments();
  }

  getAllDocuments(): void {
    this.indexService.get(`api/user/documents`).subscribe((response) => {
      if (response) {
        this.allDocumentList = response;
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

  formatName(filename: string, limit: number): string {
    return this.commonService.formatFileName(filename, limit);
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
