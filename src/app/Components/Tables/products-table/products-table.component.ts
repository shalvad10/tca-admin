import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { CompanyService } from 'src/app/Services/Http/company.service';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  constructor( private router: Router ) { }

  public tableHeight = '300px';
  public dataLoaded = true;

  @Input() data: any;
  @Input() storeView: any;
  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }  

  ngOnInit(): void {
    console.warn(this.data);
    // if ( appData.data.companies.data.length == 0 ) {
    //    SharedMethods.getCompanies(this.companyService,1,10, (rs) =>{
    //     appData.data.companies.data = rs.data;
    //     this.dataLoaded = rs !== undefined;
    //   });
    // } else {
    //   this.dataLoaded = true;
    // }
  }

  public get view() {
    return appData.data.view;
  }

  getCompany(id) {
    console.warn(id, appData.data.companies);
  }

  parseDate(dt: string) {
    const date = dt.split(' ');
    // return date[0];
    return SharedMethods.getModifiedDate(date[0]);
  }

  parseWarningDate(dt: string) {
    const date = dt.split('T')[0];
    const correctDate = date.split('-');
    const finalDate = `${correctDate[1]}/${correctDate[2]}/${correctDate[0]}`;
    return (SharedMethods.getModifiedDate(finalDate));
  }

  getStyle(data: any) {
    return `${ (SharedMethods.calculateDays(data.startDate) / SharedMethods.calculateDays(data.startDate, data.endDate)) * 100 }%`;
  }

  openProduct(id: any) {
    this.router.navigateByUrl(`/products/${id}`);
  }

  getStatus(data: any) {
    const percent = (SharedMethods.calculateDays(data.startDate) / SharedMethods.calculateDays(data.startDate, data.endDate)) * 100;
    if ( percent < 30 ) {
      return 'bg-success';
    } else if ( percent > 30 && percent < 50 ) {
      return 'bg-primary';
    } else  if (percent > 50 && percent < 75 ) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }

  tooltipText(data: any) {
    const daysNum = SharedMethods.calculateDays(data.startDate, data.endDate) - SharedMethods.calculateDays(data.startDate);//data.days - data.passedDays;
    return `დარჩა ${daysNum} დღე`;
  }
  

  getCompanyName(id) {
    if (appData.data.companies.data.length > 0) {
      return appData.data.companies.data.filter(cmp => cmp.id === id)[0].name;
    }
  }

  delete(item) {
    if (SharedMethods.isStoreView()) {
      console.warn(item);
      const modal = 'removeProduct';
      appData.data.modal.currentModal = modal;
      appData.data.modal.modals[modal].productToBranchID  = item.itemID;
      appData.data.modal.modals[modal].productQuantity  = item.quantity;
    } else {
      const modal = 'confirm';
      appData.data.modal.currentModal = modal;
      appData.data.modal.modals[modal].targetID   = item.id; 
      appData.data.modal.modals[modal].typeID     = AppEnums.main.product; 
      appData.data.modal.modals[modal].targetName = item.name;
    }

  }

  edit(id) {
    this.router.navigate(['products/add'], { queryParams: { id: id } });
  }

}
