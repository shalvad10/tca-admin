import { Component, OnInit, Input } from '@angular/core';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';

@Component({
  selector: 'app-products-log-table',
  templateUrl: './products-log-table.component.html',
  styleUrls: ['./products-log-table.component.scss']
})
export class ProductsLogTableComponent implements OnInit {

  constructor() { }

  public tableHeight = '300px';
  public dataLoaded = true;

  @Input() data: any;
  @Input() storeView: any;
  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }  

  ngOnInit(): void {
  }

  get logs() {
    return appData.data.productsLogs;
  }
  
  getFullName(user) {
    return `${user.firstName} ${user.lastName}`;
  }

  parseDate(dt: string) {
    return SharedMethods.getModifiedDate(dt);
  }

  parseWarningDate(dt: string) {
    const date = dt.split('T')[0];
    const correctDate = date.split('-');
    const finalDate = `${correctDate[1]}/${correctDate[2]}/${correctDate[0]}`;
    return (SharedMethods.getModifiedDate(finalDate));
  }
  

  getCompanyName(id) {
    if (appData.data.companies.data.length > 0) {
      return appData.data.companies.data.filter(cmp => cmp.id === id)[0].name;
    }
  }

}
