import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Http/user.service';
// import AppData from 'src/app/Data/AppData';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent implements OnInit {

  password = '';

  constructor( private user: UserService, private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    document.body.classList.add('lockscreen');
   }

   get Avatar() {
     return appData.data.avatars[appData.data.currentUser.avatarID];
   }
   get username() {
     return appData.data.currentUser.username;
   }

   login() {
     this.router.navigateByUrl('/users/auth');
   }
   authenticate() {
     console.warn(this.username, this.password);
     this.user.authenticate(this.username, this.password).subscribe( dt => {
       if (dt['message'] === 'success') {             
        //  AppData.data.user = {
        //    id: dt['data'][0].id,
        //    name: dt['data'][0].name,
        //    surname: dt['data'][0].surname,
        //    fullName: dt['data'][0].name + ' ' + dt['data'][0].surname ,
        //    nickname: dt['data'][0].nickname,
        //    email: dt['data'][0].email,
        //    password: this.password,
        //    regDate: dt['data'][0].regDate,
        //    gender: dt['data'][0].gender,
        //    avatarID: dt['data'][0].avatarID
        //  };
 
         window.localStorage.setItem('authorizedUser', JSON.stringify( {username: this.username, password: this.password, id: dt['data'][0].id} ));
 
         SharedMethods.alertNotification(this.toastr, 'success', { text: 'Welcome Back..!'});
         this.router.navigateByUrl('/');
       }
     });
   }

}
