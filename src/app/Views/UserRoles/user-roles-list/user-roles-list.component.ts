import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { UserService } from 'src/app/Services/Http/user.service';

@Component({
  selector: 'app-user-roles-list',
  templateUrl: './user-roles-list.component.html',
  styleUrls: ['./user-roles-list.component.scss']
})
export class UserRolesListComponent implements OnInit {

  dataLoaded  = false;
  isActive: boolean = true;
  selectedUserID: number = 0;
  selectedRoleID: number = 0;
  name: string = '';

  public roles: any = [ ];

  constructor( private userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    SharedMethods.getUsers(appData,this.userService, (data) => {
      appData.data.users.data = data.data;
      this.userService.getUserRoles(SharedMethods.getToken(appData)).subscribe((data:any) => {
        this.roles = data;
        this.userService.getUsersWithRoles(0,SharedMethods.getToken(appData)).subscribe((data:any) => {
         appData.data.users.usedRolesList = data;
         setTimeout(() => {
           this.dataLoaded = true;
           SharedMethods.loader(false);
         }, 500);
        });
      });
    });
  }

  get users()         { return appData.data.users.data;           }
  get height()        { return window.innerHeight - 300;          }
  get usedRolesList() { return appData.data.users.usedRolesList;  }

  setRole() {
    this.userService.setUserRole(this.selectedUserID, this.selectedRoleID, SharedMethods.getToken(appData)).subscribe( (res: any) => {
      if (SharedMethods.isSuccess(res)) {
        SharedMethods.loader(false);
        appData.data.modal.currentModal = '';
        SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
        this.userService.getUsersWithRoles(0,SharedMethods.getToken(appData)).subscribe((data:any) => {
          this.selectedUserID = 0;
          this.selectedRoleID = 0;
         appData.data.users.usedRolesList = data;
        });
      }
    }, (err) => {
      const modal                                           = 'info';
      appData.data.modal.currentModal                       = modal;
      appData.data.modal.modals[modal].text                 = err.error.message;
      ;
    });
  }

}
