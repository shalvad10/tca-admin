import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Http/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { AppEnums } from 'src/app/Enums/appEnums';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';

  constructor( private toastr: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  onEnter() {
    this.authenticate();
  }
  
  authenticate() {
    this.userService.authenticate(this.username, this.password).subscribe( (data: any) => {
      this.userService.getByID(data.id, data.token).subscribe( (dt: any) => {
        if (dt) {
          appData.data.currentUser = {
            id                : dt.id,
            avatarID          : dt.avatar ? Number.parseInt(dt.avatar) : 0,
            email             : dt.email,
            magazineBranchId  : dt.magazineBranchId,
            mobileNumber      : dt.mobileNumber,
            positionId        : dt.positionId,
            firstName         : dt.firstName,
            lastName          : dt.lastName,
            username          : dt.username,
            token             : dt.token
          };
          appData.data.view = dt.positionId > AppEnums.userPositions.HeadOffice ? 'storeView' : 'headView';
          window.localStorage.setItem('authorizedUser', JSON.stringify( {username: data.username, password: this.password, id: data.id, token: data.token} ));
          SharedMethods.alertNotification(this.toastr, 'success', { text: 'Welcome Back..!'});
          this.router.navigateByUrl('/');
        }
      });
    });
  }

}
