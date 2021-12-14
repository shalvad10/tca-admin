import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-store-branches-table',
  templateUrl: './store-branches-table.component.html',
  styleUrls: ['./store-branches-table.component.scss']
})
export class StoreBranchesTableComponent implements OnInit {

  constructor(private router: Router, private magazineService: MagazinesService) { }

  public tableHeight = '300px';
  public tableData: any;

  @Input() set data(val: any) {
    this.tableData = val.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
  }

  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }

  ngOnInit() { }

  openStore(id: any) {
    this.router.navigateByUrl(`/storeBranch/${id}`);
  }
  
  tooltipText(data: any) {
    return data;
  }

  delete(id, name) {
    const modal = 'confirm';
    appData.data.modal.currentModal = modal;
    appData.data.modal.modals[modal].typeID     = AppEnums.main.storeBranch;
    appData.data.modal.modals[modal].targetName = name;
    appData.data.modal.modals[modal].targetID   = id;
  }

  edit(id) {
    this.router.navigate(['storeBranch/add'], { queryParams: { id: id } });
  }

}
