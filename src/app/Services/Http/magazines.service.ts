
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MagazinesService {

  constructor(private http: HttpClient) { }


  getStore(id: number,token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Magazines/${id}`, {headers: headers});
  }

  getAll(token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Magazines`, {headers: headers});
  }

  create(idCode: string, name: string, email: string, contactNumber: string, address: string, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/Magazines`, { identificationCode: idCode, name: name, email: email, contactNumber: contactNumber, address: address}, {headers: headers});
  }

  delete(id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/Magazines/${id}`, {headers: headers});
  }

  getByID(id: number, token: string) {
    console.warn(id);
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Magazines/${id}`, {headers: headers});
  }

  edit(id: number, idCode: string, name: string, email: string, contactNumber: string, address: string, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.put(`${environment.connectionURL}/Magazines`, { id: id, identificationCode: idCode, name: name, email: email, contactNumber: contactNumber, address: address}, {headers: headers});
  }
}
