import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { CompanyService } from 'src/app/Services/Http/company.service';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';
import { ProductsService } from 'src/app/Services/Http/products.service';

@Component({
  selector: 'app-companies-detailed',
  templateUrl: './Companies-detailed.component.html',
  styleUrls: ['./Companies-detailed.component.scss']
})
export class CompaniesDetailedComponent implements OnInit {

  constructor(
    private router          : Router,
    private activatedRoute  : ActivatedRoute,
    private companyService  : CompanyService,
    private productsService : ProductsService
  ) { }

  dataLoaded = false;
  id: number;

  ngOnInit(): void {
    this.id = Number.parseInt(this.activatedRoute.snapshot.params.id);
    this.companyService.getSingle(this.id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
      console.warn(dt);
      if (dt) {
        appData.data.companies.selectedCompany = {
          id: dt.id,
          name: dt.name,
          idCode: dt.identificationCode,
          days: dt.defaultDaysBeforeNotifiWarning,
          products: dt.products ? dt.products.sort((a,b) => (a.name > b.name)) : []
        }
        this.dataLoaded = true;
        console.warn(this.data);
      }
    });
  }
  public get data(): any {
    return appData.data.companies.selectedCompany;
  }
}
