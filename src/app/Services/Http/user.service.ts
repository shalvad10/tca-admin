import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }
  
  allUsers(token: string){
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Users`, {headers: headers});
  }

  getUserPosition(positionID: number, token: string){
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Users/PositionGet/${positionID}`, {headers: headers});
  }
  
  getByID(id: number, token: string){
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Users/${id}`, {headers: headers});
  }
  
  getActivities(id: number, token: string){
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Users/Activity/${id}`, {headers: headers});
  }

  authenticate(username: string, password: string) {
    return this.http.post(`${environment.connectionURL}/Users/authenticate`, { username: username, password: password });
  }

  delete(id: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/Users/${id}`, {headers: headers});
  }

  register(name: string, surname: string, nickname: string, email: string, password: string, avatarID: string, mobile: string, magazineBranchId: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/Users/register`, {
      firstName         : name,
      lastName          : surname,
      username          : nickname,
      password          : password,
      email             : email,
      avatar            : avatarID,
      mobileNumber      : mobile,
      magazineBranchId  : magazineBranchId,
      positionId        : 1
    }, {headers: headers});
  }

  editUser(name: string, surname: string, nickname: string, email: string, password: string, avatarID: number, mobile: string, magazineBranchId: number, userID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.put(`${environment.connectionURL}/Users/${userID}`, {
      firstName         : name,
      lastName          : surname,
      username          : nickname,
      password          : password,
      email             : email,
      avatar            : avatarID,
      mobileNumber      : mobile,
      magazineBranchId  : magazineBranchId
    }, {headers: headers});
  }

  registerToStore(userID: number, storeID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/Users/UserReferenceCreate`, {
      userId: userID,
      magazineBranchId: storeID,
      positionId: 4
    }, {headers: headers});
  }
  
  getByStore(storeID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/MagazineBranches/${storeID}/users`, {headers: headers});
  }

  removeFromStore(userID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/Users/UserReferenceRemove/${userID}`, {headers: headers});
    
  }

  registerToSection(userID: number, sectionID: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/ResponsiblePersonsForProducts`, [{
      userId: userID,
      responsiblePersonsGroupId: sectionID
    }], {headers: headers});
  }

  removeFromSection(UserId: number, GroupId: number, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/ResponsiblePersonsForProducts/?UserId=${UserId}&GroupId=${GroupId}`, {headers: headers});
    
  }

  getPositions(token: string){
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Users/Positions`, {headers: headers});
  }

  getSinglePosition(id: number, token: string){
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.get(`${environment.connectionURL}/Users/PositionGet/${id}`, {headers: headers});
  }

  createPosition(name: string, isActive: boolean, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.post(`${environment.connectionURL}/Users/PositionCreate`,{name: name, isActive: isActive}, {headers: headers});
  }

  updatePosition(roleID: number, name: string, isActive: boolean, token: string) {
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.put(`${environment.connectionURL}/Users/PositionUpdate`, {id: roleID, name : name, isActive : isActive}, {headers: headers});
  }

  removePosition(roleID: number, token: string){
    let headerSettings = {};
    headerSettings['Authorization'] = `Bearer ${token}`;
    let headers = new HttpHeaders(headerSettings);
    return this.http.delete(`${environment.connectionURL}/Users/PositionRemove/${roleID}`, {headers: headers});
  }
}
