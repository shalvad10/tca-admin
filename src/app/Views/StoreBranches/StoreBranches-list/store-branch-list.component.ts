import { Component, OnInit } from '@angular/core';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { MagazineBranchesService } from 'src/app/Services/Http/magazine-branches.service';

@Component({
  selector: 'app-store-branch-list',
  templateUrl: './store-branch-list.component.html',
  styleUrls: ['./store-branch-list.component.scss']
})
export class StoreBranchListComponent implements OnInit {

  constructor( private magazineBranchesService: MagazineBranchesService ) { }

  ngOnInit(): void {
    this.magazineBranchesService.getAll(SharedMethods.getToken(appData)).subscribe((data: any) => {
      if ( SharedMethods.isSuccess(data) ) {
        appData.data.stores.branches.allBranches = data.data;
      }
    });
  }


  public get tableData() {
    return appData.data.stores.branches.allBranches;
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

  get height() { return window.innerHeight - 300; }

}

