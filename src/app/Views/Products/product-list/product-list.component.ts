import { Component, OnInit } from '@angular/core';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { ProductsService } from 'src/app/Services/Http/products.service';
import { CompanyService } from 'src/app/Services/Http/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor( private productService: ProductsService, private companiesService: CompanyService, private router: Router) {
    this.router.events.subscribe( (dt: any) => {
      if (dt.urlAfterRedirects === '/products') {
        this.dataLoaded = false;
        SharedMethods.loader(true);
        appData.data.products = [];
        if (SharedMethods.isStoreView()) {
          this.loadProducts();
        } else {
          SharedMethods.getProducts(appData, this.productService,(data: any) => {
            appData.data.products = data;
          });
        }
      }
    });
   }

  dataLoaded = false;
  filterOptions = {
    isWarning: false
  };
  openFilter = false;

  ngOnInit(): void {
    SharedMethods.loader(true);
    if (appData.data.products.length == 0) {
      if (SharedMethods.isStoreView()) {
        this.loadProducts();
      } else {
        SharedMethods.getProducts(appData, this.productService,(data: any) => {
          appData.data.products = data;
        });
      }
    }
    if (appData.data.companies.data.length === 0) {
      this.companiesService.getAll(SharedMethods.getToken(appData)).subscribe( ( data: any ) => {
        appData.data.companies.data = data.data;
        this.dataLoaded = true;
        SharedMethods.loader(false);
      });
    } else {
      this.dataLoaded = true;
      SharedMethods.loader(false);
    }
  }

  toggleFilter() {
    this.openFilter = !this.openFilter;
  }
  printPage() {
    let divToPrint = document.getElementById("tablerecords");  
    let newWin = window.open("");  
    newWin.document.write(divToPrint.outerHTML);  
    newWin.print();  
    newWin.close(); 
  }

  doFilter() {
    if (this.filterOptions.isWarning) {
      const tmpArr = appData.data.products.filter( item => item.isWarning == this.filterOptions.isWarning);
      appData.data.products = Object.assign(tmpArr, {})
      
    } else {
      this.loadProducts();
    }
    this.openFilter = !this.openFilter;
  }

  loadProducts() {
    SharedMethods.getProductsByStore(appData, this.productService,this.storeID,(data: any) => {
      appData.data.products = [];
      data.forEach(el => {
        const tmpData         = el.product;
        tmpData.itemID        = el.productToBranch.id;
        tmpData.quantity      = el.productToBranch.quantity;
        tmpData.startDate     = el.productToBranch.registerDate;
        tmpData.endDate       = el.productToBranch.termDate;
        tmpData.warningDate   = el.warningTermDateBegin;
        tmpData.isWarning     = el.isWarning;
        appData.data.products.push(tmpData);
      });
      this.dataLoaded = true;
      SharedMethods.loader(false);
    });
  }

  get isStore()   { return SharedMethods.isStoreView();               }
  get products()  { return appData.data.products;                     }
  get height()    { return window.innerHeight - 210;                  }
  get storeID()   { return appData.data.currentUser.magazineBranchId; }

}

