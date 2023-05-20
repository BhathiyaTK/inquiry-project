import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private data = new BehaviorSubject('');
  data$ = this.data.asObservable();

  token: any = localStorage.getItem('user-JWT');

  constructor() { }

  changeAlertCount(data: string) {
    this.data.next(data);
  }

  setWeekStartingDate(d: string | number | Date): any {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -5.30 : 1);
    return new Date(d.setDate(diff));
  }

  formatFileName(name: string, limit: number): string {
    const splittedText = name.split('.', 2);
    if (splittedText[0].length > limit) {
      const formattedText = splittedText[0].slice(0, limit - 4) + '...' + splittedText[0].slice(-4) + '.' + splittedText[1]
      return formattedText;
    }
    return name;
  }

  getUserId(): any {
    let jwtH = new JwtHelperService();
    let decoded = jwtH.decodeToken(this.token);
    return decoded.userId;
  }
}
