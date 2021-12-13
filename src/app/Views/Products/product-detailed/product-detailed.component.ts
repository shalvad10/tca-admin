import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { ProductsService } from 'src/app/Services/Http/products.service';
import { SectionsService } from 'src/app/Services/Http/sections.service';

@Component({
  selector: 'app-product-detailed',
  templateUrl: './product-detailed.component.html',
  styleUrls: ['./product-detailed.component.scss']
})
export class ProductDetailedComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductsService, private sectionService: SectionsService) { }

  id                : number;
  dataLoaded        : boolean = false;
  warningItemsCount : number = 0;
  companyName       : string;
  sectionName       : string;

  ngOnInit(): void {
    this.warningItemsCount = 0;
    this.id = Number.parseInt(this.activatedRoute.snapshot.params.id);
    if (this.products.length > 0) {
      appData.data.products = [].concat(appData.data.products.filter(pr => pr.id == this.id));
      appData.data.products.forEach(el => {
        if (el.isWarning) {
          this.warningItemsCount += 1;
        }
      });
      this.dataLoaded = true;
    } else {
      SharedMethods.getProductsByStore(appData, this.productService,this.storeID,(data: any) => {
        appData.data.products = [];
        data.forEach(el => {
            if (el.isWarning) {
              this.warningItemsCount += 1;
            }
          const tmpData         = el.product;
          tmpData.startDate     = el.productToBranch.registerDate;
          tmpData.endDate       = el.productToBranch.termDate;
          tmpData.warningDate   = el.warningTermDateBegin;
          tmpData.isWarning     = el.isWarning;
          tmpData.sectionID     = el.productToBranch.responsiblePersonsGroupId;
          appData.data.products.push(tmpData);
        });
        this.dataLoaded = true;
      });
    }
    this.productService.getSingle(this.id, SharedMethods.getToken(appData)).subscribe( (data: any) => {
      this.companyName = data.company.name;
    });

    setTimeout(() => {
      this.sectionService.getSingle(appData.data.products[0].sectionID, SharedMethods.getToken(appData)).subscribe( (data: any) => {
        this.sectionName = data.name;
      });
    }, 100);
    
  }

  get company()   { return this.companyName;                          }
  get section()   { return this.sectionName;                          }
  get isStore()   { return SharedMethods.isStoreView();               }
  get products()  { return appData.data.products;                     }
  get height()    { return 300;                                       }
  get storeID()   { return appData.data.currentUser.magazineBranchId; }

}
