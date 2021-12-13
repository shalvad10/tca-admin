import { Component, OnInit } from '@angular/core';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { ProductsService } from 'src/app/Services/Http/products.service';

@Component({
  selector: 'app-product-logs',
  templateUrl: './product-logs.component.html',
  styleUrls: ['./product-logs.component.scss']
})
export class ProductLogsComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getLogs(SharedMethods.getToken(appData)).subscribe((data: any) => {
      if(data) {
        console.warn(data);
        appData.data.productsLogs = data;
      }
    });
  }

}
