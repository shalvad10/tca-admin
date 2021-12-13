import { Component, OnInit } from '@angular/core';
// import AppData from 'src/app/Data/AppData';
import { UserService } from 'src/app/Services/Http/user.service';
import { Router } from '@angular/router';
import appData from 'src/app/Services/Data/AppData';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  constructor( private userService: UserService, private router: Router, private toastr: ToastrService) { }

  selectedIndex: number = 0;
  name: string = '';
  surname: string = '';
  userName: string = '';
  eMail: string = '';
  password: string = '';
  regDate: string = '';
  gender: number = 0;
  magazineBranchId: number = 0;
  mobileNumber: number;
  showWarnings: boolean = false;

  public genders = [
    { name: 'მდედრობითი', value: 1},
    { name: 'მდედრობითი', value: 1}
  ];

  isEdit = false;

  get isValidated() {
    return this.name.length > 0 && this.surname.length > 0 && this.userName.length > 0 && this.eMail.length > 0 && this.password.length > 0 && this.mobileNumber > 0 && this.gender > 0;
  }

  ngOnInit(): void {
      if ( this.userData.id > 0 ) {
        this.isEdit = true;
        this.name = this.userData.firstName;
        this.surname = this.userData.lastName;
        this.userName = this.userData.username;
        this.eMail  = this.userData.email;
        this.gender = this.userData.gender;
        this.selectedIndex = this.userData.avatar ? this.userData.avatar : 0;
        this.magazineBranchId = this.userData.magazineBranchId;
      }
  }

  ngOnDestroy(): void {
    appData.data.userToEdit = {
      id                : 0,
      avatarID          : 0,
      email             : '',
      magazineBranchId  : 0,
      mobileNumber      : 0,
      positionId        : 0,
      firstName         : '',
      lastName          : '',
      username          : '',
      token             : '',
    };
  }

  selectAvatar(ind: any) {
    this.selectedIndex = ind;
  }

  public get userID(){
    return appData.data.userToEdit.id;
  }

  public get userData(): any {
    return appData.data.userToEdit;
  }

  public get avatars() {
    return appData.data.avatars;
  }


  registerUser() {
    if (this.isValidated) {
      if ( this.isEdit ) {
        this.userService.editUser(
          this.name,
          this.surname,
          this.userName,
          this.eMail,
          this.password,
          this.selectedIndex,
          this.mobileNumber.toString(),
          this.magazineBranchId,
          this.userID,
          SharedMethods.getToken(appData)
        ).subscribe( (res: any) => {
          if (res) {
            SharedMethods.alertNotification(this.toastr, 'success', { text: 'ოპერაცია წარმატებით შესრულდა'});
          }
        });
      } else {
        this.userService.register(
          this.name,
          this.surname,
          this.userName,
          this.eMail,
          this.password,
          this.selectedIndex.toString(),
          this.mobileNumber.toString(),
          this.magazineBranchId,
          SharedMethods.getToken(appData)
          ).subscribe( (res: any) => {
            if (res) {
              SharedMethods.alertNotification(this.toastr, 'success', { text: 'ოპერაცია წარმატებით შესრულდა'});
            }
        });
      }
    } else {
      this.showWarnings = true;
    }
  }

}
