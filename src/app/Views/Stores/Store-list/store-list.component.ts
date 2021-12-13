import { Component, OnInit } from '@angular/core';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss']
})
export class StoreListComponent implements OnInit {

  constructor(
    private magazineService: MagazinesService
    ) { }

  tableData = {
    rows: [ 'ID', 'საიდ. კოდი', 'სახელი', 'მისამართი', 'ელ.ფოსტა', 'ტელეფონი'],
    data: []
  };

  ngOnInit(): void {
    console.warn(appData.data.stores,);
    if (appData.data.stores.allStores.length == 0) {
      this.magazineService.getAll(SharedMethods.getToken(appData)).subscribe((data: any) => {
        if ( SharedMethods.isSuccess(data) ) {
          this.tableData.data = data.data;
          appData.data.stores.allStores = data.data;
        }
      });
    } else {
      this.tableData.data = appData.data.stores.allStores;
    }
  }

  public generateSingleProduct(product) {
    let tmpProduct = {
      id: product.id,
      code: product.identificationCode,
      name: product.name,
      company: product.companyId,
      startDate: product.regDate,
      days: product.days,
      passedDays: product.days - product.daysRemaining
    };
    return tmpProduct;
  }

  // get height() { return window.innerHeight - 160; }

}

