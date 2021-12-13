import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SectionsService {

  constructor(private http: HttpClient) { }

  create(name: string, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/ResponsiblePersonsGroups`, { name:name }, {headers: headers} );
  }

  delete(id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/ResponsiblePersonsGroups/${id}`, {headers: headers} );
  }

  getAll(token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/ResponsiblePersonsGroups`, {headers: headers} );
  }

  getAllWithData(token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/ResponsiblePersonsGroups/CurrentUseOfSection`, {headers: headers} );
  }

  getSingle(ID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/ResponsiblePersonsGroups/${ID}`, {headers: headers} );
  }

  edit(name: string, users: any[], id: number, token: string='') {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.put(`${environment.connectionURL}/sections/edit`, { sectionName:name, users:users, id:id }, {headers: headers}  );
  }

}
