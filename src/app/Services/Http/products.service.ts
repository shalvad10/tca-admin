import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { ImportProduct } from '../../Services/Interfaces/importProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  add(code: string, name: string, companyID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/Products`, { 
      identificationCode: code,
      name: name,
      companyId: companyID
    }, {headers: headers});
  }

  import(params: ImportProduct[], token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/ProductToBranches`, params, {headers: headers});
  }

  getAll(token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Products`, {headers: headers});
  }

  getSingle(ID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Products/${ID}`, {headers: headers});
  }
  

  getByStore(storeID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/ProductToBranches/${storeID}/ProductsWithTerm`, {headers: headers});
  }

  delete(Id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/Products/${Id}`, {headers: headers} );
  }

  edit(id: number, code: string, name: string, companyID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.put(`${environment.connectionURL}/Products`, { id: id, identificationCode: code, name: name, companyId: companyID }, {headers: headers} );
  }

  removeProduct( productID: number, reasonID: number, quantity: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/ProductToBranches/OutOfStockCreate`, {
      id: 0,
      isOutOfStock: true,
      outOfStockReason: "remove",
      productToBranchId: productID,
      reasonForOutOfStockId: reasonID,
      quantity: quantity
    }, {headers: headers} );
  }

  getLogs(token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/ProductToBranches/OutOfStocks`, {headers: headers});
  }
}
