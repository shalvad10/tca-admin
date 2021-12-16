import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Http/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import appData from 'src/app/Services/Data/AppData';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user-roles',
  templateUrl: './add-user-roles.component.html',
  styleUrls: ['./add-user-roles.component.scss']
})

export class AddUserRolesComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router, private toastr: ToastrService) { }

  name: string = '';
  isActive: boolean = true;
  id: number;

  public isActive1 = [
    { name: 'აქტიური', value: true},
    { name: 'პასიური', value: false}
  ];

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.id) {
      this.id = Number.parseInt(this.activatedRoute.snapshot.queryParams.id);
      this.userService.getSinglePosition(this.id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
        console.warn(dt);
        this.name         = dt.name;
        this.isActive     = dt.isActive;
      });
    }}

  ngOnDestroy(): void { }


  registerRole() {
    if(this.id == undefined) {
      this.userService.createPosition(this.name,this.isActive,SharedMethods.getToken(appData)).subscribe( (data: any) => {
        console.warn(data);
        if (data) {
          SharedMethods.alertNotification(this.toastr, 'success', { text: 'ოპერაცია წარმატებით შესრულდა'});
          setTimeout(() => {
            this.router.navigateByUrl('/userRoles');
          }, 500);
        }
      });
    } else {
      this.userService.updatePosition(this.id,this.name,this.isActive,SharedMethods.getToken(appData)).subscribe( (data: any) => {
        console.warn(data);
        if (data) {
          SharedMethods.alertNotification(this.toastr, 'success', { text: 'ოპერაცია წარმატებით შესრულდა'});
          setTimeout(() => {
            this.router.navigateByUrl('/userRoles');
          }, 500);
        }
      });
    }
  }

}
