import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { UserService } from 'src/app/Services/Http/user.service';
import { AppEnums } from 'src/app/Enums/appEnums';
// import AppData from 'src/app/Data/AppData';

@Component({
  selector: 'app-last-users',
  templateUrl: './last-users.component.html',
  styleUrls: ['./last-users.component.scss']
})
export class LastUsersComponent implements OnInit {

  tmpUser = '';
  Activities;
  // data = AppData.data;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.Activities = [];
    // this.activitiesService.getAllActivities().subscribe( (dt: any) => {
    //   dt.data.forEach( activity => {
    //     if ( activity.activityID == AppEnums.activityID.authUser) {
    //       this.userService.getByID(activity.userID).subscribe( (usr:any) => {
    //         this.tmpUser = SharedMethods.concatName(usr.data[0].name, usr.data[0].surname);
    //         const tmpActivity = {
    //           date: activity.activityDate,
    //           user: this.tmpUser,
    //           avatar: usr.data[0].avatarID
    //         };
    //         this.Activities.push(tmpActivity);
    //       });
    //     }
    //   });
    // });
    setTimeout(()=> {
      if (this.Activities.length > 0) {
        this.Activities = SharedMethods.sortByDate(this.Activities);
      }
    },100);
  }

  seeAllUsers() {
    this.router.navigateByUrl('/users');
  }

  avatar(avt) {
    // return this.data.avatars[avt];
  }

}
