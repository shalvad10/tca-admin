import { Component, OnInit } from '@angular/core';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { UserService } from 'src/app/Services/Http/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  dataLoaded  = false;

  constructor( private userService: UserService) { }

  ngOnInit(): void {
    console.warn(this.users);
    if ( this.users.length == 0) {
      if (SharedMethods.isStoreView()) {
        SharedMethods.getUsersByStore(appData, this.storeID,this.userService,(dt: any) => {
          dt.forEach(el => {
            const tmpUser             = el.user;
            tmpUser.magazineBranch    = el.magazineBranchs.name;
            tmpUser.magazineBranchId  = el.magazineBranchs.id;
            tmpUser.position          = el.positions.name;
            tmpUser.positionId        = el.positions.id;
            tmpUser.fullInfo          = el;
            appData.data.users.data.push(tmpUser);
          });
          this.dataLoaded = true;
          SharedMethods.loader(false);
        });
      } else {
        SharedMethods.getUsers(appData,this.userService,(dt: any) => {
          console.warn(dt);
          appData.data.users.data = dt.data;
          appData.data.users.active = dt.pageNumber;
          if (appData.data.users.pages.length == 0) {
            for ( let i = 1; i <= dt.totalPages; i++ ) {
              appData.data.users.pages.push(i);
            }
          }
          this.dataLoaded = true;
          SharedMethods.loader(false);
        });
      }
    } else {
      this.dataLoaded = true;
    }
  }

  get storeID() {
    return appData.data.currentUser.magazineBranchId;
  }
  get users(): any {
    return appData.data.users.data;
  }
  get pages(): any {
    return appData.data.users.pages;
  }
  get activePage(): any {
    return appData.data.users.active;
  }

  navigate(page: number) {    
    SharedMethods.getUsers(appData,this.userService,(dt: any) => {
      appData.data.users.data = dt.data;
      appData.data.users.active = dt.pageNumber;
      if (appData.data.users.pages.length == 0) {
        for ( let i = 1; i <= dt.totalPages; i++ ) {
          appData.data.users.pages.push(i);
        }
      }
    });
  }

}
