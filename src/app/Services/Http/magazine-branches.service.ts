import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MagazineBranchesService {

  constructor(private http: HttpClient) { }

  getStore(id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/MagazineBranches/${id}`, {headers: headers});
  }

  create(idCode:string, name:string, lct: string, storeID: number, eMail: string, contactNumber: string,  token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/MagazineBranches`, { identificationCode: idCode, name: name, location: lct, magazineId: storeID, email: eMail, contactNumber: contactNumber  }, {headers: headers});
  }

  delete(id:number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/MagazineBranches/${id}`, {headers: headers});
  }

  getAll(token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/MagazineBranches`, {headers: headers});
  }

  getByID(id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/MagazineBranches/${id}`, {headers: headers});
  }

  edit(idCode: string, name: string, id: number, lct: string, storeID: number, eMail: string, contactNumber: string,  token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.put(`${environment.connectionURL}/MagazineBranches`, { identificationCode: idCode, location: lct, name: name, id: id, magazineId: storeID, email: eMail, contactNumber: contactNumber }, {headers: headers});
  }
  getUsers(storeID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/MagazineBranches/${storeID}/users`, {headers: headers});
  }
}
