import { Component, OnInit } from '@angular/core';
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

  constructor( private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPositions(SharedMethods.getToken(appData)).subscribe((data:any) => {
      data.forEach( position => {
        position.status = position.isActive ? 'აქტიური' : 'პასიური';
      });
      appData.data.users.positions = data;
      this.dataLoaded = true;
    });
  }

  public get positions() {
    return appData.data.users.positions;
  }

  get height() { return window.innerHeight - 300; }

}
