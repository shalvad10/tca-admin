import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import appData from 'src/app/Services/Data/AppData';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  constructor(private router: Router, private magazineService: MagazinesService) { }

  public tableHeight = '300px';
  public tableData: any;
  public sectionID: number;

  @Input() fields;
  @Input() type; // section,store

  @Input() set data(val: any) {
    this.tableData = val.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
  }

  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }

  ngOnInit() {
    if (appData.data.modal.modals[appData.data.modal.currentModal]) {
      this.sectionID = appData.data.modal.modals[appData.data.modal.currentModal].sectionID;
      console.warn(this.sectionID);
    }
  }

  delete(id) {
    const modal                                           = 'confirm';
    appData.data.modal.currentModal                       = modal;
    appData.data.modal.modals[modal].typeID               = AppEnums.main.user;
    appData.data.modal.modals[modal].activityID           =  this.type === 'section' ? AppEnums.activityID.user_DFSECTION : AppEnums.activityID.user_DFSTORE;
    appData.data.modal.modals[modal].data['userID']       = id;
    appData.data.modal.modals[modal].data['sectionID']    = this.sectionID;
  }

}
