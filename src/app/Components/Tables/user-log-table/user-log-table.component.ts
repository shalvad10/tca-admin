import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import appData from 'src/app/Services/Data/AppData';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-user-log-table',
  templateUrl: './user-log-table.component.html',
  styleUrls: ['./user-log-table.component.scss']
})
export class UserLogTableComponent implements OnInit {

  constructor(private router: Router, private magazineService: MagazinesService) { }

  public tableHeight = '300px';

  @Input() data;
  @Input() avatars;

  getAvatar(id) {
    return this.avatars[id];
  }

  ngOnInit() { }

  getStyle(data: any) {
    return `${ (data.passedDays / data.days) * 100 }%`;
  }

  delete(id, name) {
    const modal = 'confirm';
    appData.data.modal.currentModal = modal;
    appData.data.modal.modals[modal].typeID     = AppEnums.main.store;
    appData.data.modal.modals[modal].targetName = name;
    appData.data.modal.modals[modal].targetID   = id;
  }

}
