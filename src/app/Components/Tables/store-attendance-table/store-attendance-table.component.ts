import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import appData from 'src/app/Services/Data/AppData';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-store-attendance-table',
  templateUrl: './store-attendance-table.component.html',
  styleUrls: ['./store-attendance-table.component.scss']
})
export class StoreAttendanceTableComponent implements OnInit {

  constructor(private router: Router, private magazineService: MagazinesService) { }

  public tableHeight = '300px';
  public tableData: any;

  @Input() data;
  @Output() openDetails = new EventEmitter();

  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }

  ngOnInit() { }

  openStore(id: any) {
    this.router.navigateByUrl(`/store/${id}`);
  }
  
  tooltipText(data: any) {
    return data;
  }

  details(id) {
    this.openDetails.emit(id);
  }

}
