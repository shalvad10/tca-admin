import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/Services/Http/company.service';
import { ProductsService } from 'src/app/Services/Http/products.service';
import appData from 'src/app/Services/Data/AppData';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  barCode           : string    = '';
  id                : number;
  name              : string    = '';
  selectedCompanyID : number;
  showWarnings      : boolean   = false;

  constructor(
    private companyService  : CompanyService,
    private productService  : ProductsService,
    private activatedRoute  : ActivatedRoute,
    private router          : Router,
    private toastr          : ToastrService
  ) { }

  
  public get companies() {
    return appData.data.companies.data;
  }

  ngOnInit(): void {
    if ( appData.data.companies.data.length === 0) {
      this.companyService.getAll(SharedMethods.getToken(appData)).subscribe( (dt: any) => {
        appData.data.companies.data = dt.data;
      });
    }
    this.id = Number.parseInt(this.activatedRoute.queryParams['_value'].id);
    if ( this.id ) {
      if (this.products.length > 0) {
        const selectedProduct = appData.data.products.filter(pr => pr.id == this.id)[0];
        this.assignParams(selectedProduct);
      } else {
        SharedMethods.getProducts(appData, this.productService,(data: any) => {
          appData.data.products = data;
          const selectedProduct = appData.data.products.filter(pr => pr.id == this.id)[0];
          this.assignParams(selectedProduct);
        });
      }
    }

  }

  public get products() {
    return appData.data.products;
  }

  assignParams(item: any) {
    this.barCode = item.identificationCode;
    this.name = item.name;
    this.selectedCompanyID = item.companyId;
  }


  send() {
    if (this.name.length && this.barCode.length > 0 && this.selectedCompanyID > 0) {
      SharedMethods.loader(true);
      if ( this.id > 0 ) {
        if (this.selectedCompanyID === undefined) {
          this.selectedCompanyID = appData.data.companies.data[0].id;
        }
        this.productService.edit( this.id, this.barCode, this.name, this.selectedCompanyID, SharedMethods.getToken(appData) ).subscribe( (dt: any) => {
          if ( dt ) {
            setTimeout(() => {
              SharedMethods.loader(false);
              this.router.navigateByUrl('/products');
            }, 1000);
          }
        });
      } else {
        if (this.selectedCompanyID === undefined) {
          this.selectedCompanyID = appData.data.companies.data[0].id;
        }
        this.productService.add(
          this.barCode,
          this.name,
          this.selectedCompanyID,
          SharedMethods.getToken(appData)
        ).subscribe( (dt: any) => {
          if ( dt ) {
            appData.data.products.push(dt);
            setTimeout(() => {
              SharedMethods.loader(false);
              SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
              this.router.navigateByUrl('/products');
            }, 1000);
          }
        });
      }
    }else {
      this.showWarnings = true;
    }
  }

}
