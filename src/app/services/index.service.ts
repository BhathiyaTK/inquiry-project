import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private _httpClient: HttpClient) { }

  public get(url: string, params?: HttpParams): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._httpClient.get(`${environment.apiBasePath}${url}`, { headers, params: params });
  }

  public post(url: string, params?: object | FormData | File[]): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._httpClient.post(`${environment.apiBasePath}${url}`, params, { headers });
  }

  public put(url: string, params?: object): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._httpClient.put(`${environment.apiBasePath}${url}`, params, { headers });
  }

  public delete(url: string, params?: HttpParams, body?: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._httpClient.delete(`${environment.apiBasePath}${url}`, { headers, params: params, body });
  }

  public upload(url: string, params?: FormData | File[]): Observable<any> {
    let headers = new HttpHeaders();
    return this._httpClient.post(`${environment.apiBasePath}${url}`, params, { headers });
  }

  public getBlob(url: string, params?: HttpParams): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this._httpClient.get(`${environment.apiBasePath}${url}`, { headers, params: params, responseType: 'blob' });
  }

}
