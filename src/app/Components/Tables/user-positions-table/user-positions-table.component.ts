import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-user-positions-table',
  templateUrl: './user-positions-table.component.html',
  styleUrls: ['./user-positions-table.component.scss']
})
export class UserPositionsTableComponent implements OnInit {

  constructor(private router: Router) { }

  public tableHeight = '300px';
  public tableData: any;

  @Input() set data(val: any) {
    console.warn(val);
    this.tableData = val.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    SharedMethods.loader(false);
  }

  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }

  ngOnInit() {
  }

  delete(id) {
    // const modal                                           = 'confirm';
    // appData.data.modal.currentModal                       = modal;
    // appData.data.modal.modals[modal].typeID               = AppEnums.main.user;
    // appData.data.modal.modals[modal].activityID           = AppEnums.activityID.user_DELROLE;
    // appData.data.modal.modals[modal].data['roleID']       = id;
  }

  getFullName(user: any) {
    return `${user.firstName} ${user.lastName}`;
  }

  edit(id) {
    this.router.navigate(['userPositions/add'], { queryParams: { id: id } });
  }

}
