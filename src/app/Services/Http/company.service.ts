import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CompanyService {


  constructor(private http: HttpClient) { }

  create(code: string,name: string, days: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/Companies`, { identificationCode:code, name:name, defaultDaysBeforeNotifiWarning: days }, { headers: headers } );
  }

  delete(id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/Companies/${id}`, { headers: headers } );
  }

  getAll(token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    headerSettings['Content-Type' ] = `application/json; charset=utf-8`;
    headerSettings['Accept'       ] = `*/*`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Companies`, { headers: headers });
  }
  
  getSingle(id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    headerSettings['Content-Type' ] = `application/json; charset=utf-8`;
    headerSettings['Accept'       ] = `*/*`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Companies/${id}`, { headers: headers });
  }

  edit(idCode: string, name: string, id: number, days: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.put(`${environment.connectionURL}/Companies`, { identificationCode: idCode, name: name, defaultDaysBeforeNotifiWarning: days, id: id }, { headers: headers });
  }

}
