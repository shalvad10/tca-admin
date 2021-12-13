import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-last-actions',
  templateUrl: './last-actions.component.html',
  styleUrls: ['./last-actions.component.scss']
})
export class LastActionsComponent implements OnInit {

  Activities = [];
  tmpUser = '';

  constructor() { }

  ngOnInit(): void {
    // this.activitiesService.getAllActivities().subscribe( (dt: any) => {
    //   console.warn(dt.data);
    //   dt.data.forEach( activity => {
    //     if ( activity.activityID !== AppEnums.activityID.authUser) {
    //       if (activity.userID !== null ) {
    //         this.userService.getByID(activity.userID).subscribe( (usr:any) => {
    //           this.tmpUser = SharedMethods.concatName(usr.data[0].name, usr.data[0].surname);
    //           const tmpActivity = {
    //             activityID: activity.id,
    //             activityDate: activity.activityDate,
    //             user: this.tmpUser,
    //             action: SharedMethods.getActivityName(activity.activityID)
    //           };
    //           if (this.Activities.length < 10) {
    //             this.Activities.push(tmpActivity);
    //           }
    //         });
    //       }
    //     }
    //   });
    // });
  }
}
