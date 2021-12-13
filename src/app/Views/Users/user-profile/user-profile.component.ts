import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/Http/user.service';
import appData from 'src/app/Services/Data/AppData';
import SharedMethods from 'src/app/Helpers/SharedMethods';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor( private router: Router , private route: ActivatedRoute, private userService: UserService) { }

  selectedTab = 'timeline';
  // data = AppData.data;
  userID = Number.parseInt(this.route.snapshot.paramMap.get("id"));
  user = null;
  userFullData = undefined;
  activitiesData = null;

  ngOnInit(): void {

    this.userService.getByID(this.userID, SharedMethods.getToken(appData)).subscribe( (usr: any) => {
      console.warn(usr);
      const userData = usr;
      this.userFullData = userData;
      this.user = {
        id        : usr.id,
        fullName  : `${userData.firstName} ${userData.lastName}`,
        userName  : userData.username,
        avatar    : appData.data.avatars[Number.parseInt(usr.avatar)],
        position  : userData.position,
        store     : userData.magazineBranch
      }
    });

    // this.userService.getActivities(this.userID, SharedMethods.getToken(appData)).subscribe(( dt: any) => {
    //   this.activitiesData = [];
    //   dt.forEach( (activity: any) => {
    //     console.warn(activity);
    //     const tmpObj = {
    //       date: SharedMethods.getModifiedDate(activity.date),
    //       data: []
    //     };
    //     activity.activities.forEach( (single:any) => {
    //       console.warn(SharedMethods.getHoursFromDate(single.createDate));
    //       const obj = {
    //         time: SharedMethods.getHoursFromDate(single.createDate),
    //         action: SharedMethods.getActivityName(single.url)
    //       };
    //       tmpObj.data.push(obj);
    //     });
    //     this.activitiesData.push(tmpObj);
    //     console.warn(this.activitiesData);
    //   });
    // });

  }

  get authorisedUser() {
    return appData.data.currentUser.username;
  }

  selectTab(val: any) {
    this.selectedTab = val;
  }

  editUser() {
    appData.data.userToEdit = this.userFullData;
    this.router.navigateByUrl('users/register');
  }
  deleteUser() {
    this.userService.delete(this.user.id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
      console.warn(dt);
    });
  }

}
