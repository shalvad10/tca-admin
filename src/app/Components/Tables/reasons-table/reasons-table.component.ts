import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import appData from 'src/app/Services/Data/AppData';

@Component({
  selector: 'app-reasons-table',
  templateUrl: './reasons-table.component.html',
  styleUrls: ['./reasons-table.component.scss']
})
export class ReasonsTableComponent implements OnInit {

  constructor(private router: Router) { }

  public tableHeight = '300px';
  public tableData: any;
  public sectionID: number;

  @Input() set data(val: any) {
    this.tableData = val.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
  }

  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }

  ngOnInit() { }

  delete(id) {
    const modal                                           = 'confirm';
    appData.data.modal.currentModal                       = modal;
    appData.data.modal.modals[modal].typeID               = AppEnums.main.reason;
    appData.data.modal.modals[modal].activityID           = AppEnums.activityID.reasons_DELETE;
    appData.data.modal.modals[modal].data['userID']       = id;
  }

}
