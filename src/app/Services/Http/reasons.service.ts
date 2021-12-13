import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReasonsService {

  constructor(private http: HttpClient) { }

  getAll(token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/StaticEntities/ReasonForOutOfStocks`, {headers: headers});
  }

  getSingle(ID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/StaticEntities/ReasonForOutOfStocks/${ID}`, {headers: headers});
  }

  create(name: string, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/StaticEntities`, {name: name, isActive: true}, {headers: headers});
  }

  delete(Id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/StaticEntities/ReasonForOutOfStock/${Id}`, {headers: headers} );
  }

  edit(name: string, isActive: boolean, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.put(`${environment.connectionURL}/StaticEntities/ReasonForOutOfStockUpdate`, { name: name, isActive: isActive}, {headers: headers} );
  }
}
