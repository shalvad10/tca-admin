import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import appData from 'src/app/Services/Data/AppData';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-table',
  templateUrl: './store-table.component.html',
  styleUrls: ['./store-table.component.scss']
})
export class StoreTableComponent implements OnInit {

  constructor(private router: Router, private magazineService: MagazinesService) { }

  public tableHeight = '300px';
  public tableRows: any;
  public tableData: any;

  @Input() set data(val: any) {
    this.tableRows = val.rows;
    this.tableData = val.data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0))
  }

  @Input() set height(val: any){
    console.warn(val)
    this.tableHeight = val+'px';
  }

  ngOnInit() { }

  openStore(id: any) {
    this.router.navigateByUrl(`/store/${id}`);
  }
  
  tooltipText(data: any) {
    return data;
  }

  delete(id, name) {
    const modal = 'confirm';
    appData.data.modal.currentModal = modal;
    appData.data.modal.modals[modal].typeID     = AppEnums.main.store;
    appData.data.modal.modals[modal].targetName = name;
    appData.data.modal.modals[modal].targetID   = id;
  }

  edit(id) {
    this.router.navigate(['store/add'], { queryParams: { id: id } });
  }

}
