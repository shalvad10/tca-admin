import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import appData from 'src/app/Services/Data/AppData';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-user-roles-table',
  templateUrl: './user-roles-table.component.html',
  styleUrls: ['./user-roles-table.component.scss']
})
export class UserRolesTableComponent implements OnInit {

  constructor(private router: Router, private magazineService: MagazinesService) { }

  public tableHeight = '300px';
  public tableData: any;

  @Input() set data(val: any) {
    console.warn(val);
    this.tableData = val.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
  }

  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }

  ngOnInit() {
  }

  delete(id) {
    const modal                                           = 'confirm';
    appData.data.modal.currentModal                       = modal;
    appData.data.modal.modals[modal].typeID               = AppEnums.main.user;
    appData.data.modal.modals[modal].activityID           = AppEnums.activityID.user_DELROLE;
    appData.data.modal.modals[modal].data['roleID']       = id;
  }

  edit(id) {
    this.router.navigate(['userRoles/add'], { queryParams: { id: id } });
  }

}
