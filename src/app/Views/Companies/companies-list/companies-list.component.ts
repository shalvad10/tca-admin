import { Component, OnInit } from '@angular/core';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { CompanyService } from 'src/app/Services/Http/company.service';

@Component({
  selector: 'app-sections-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

  constructor( private companyService: CompanyService) { }

  dataLoaded  = false;

  ngOnInit(): void {
    this.companyService.getAll(SharedMethods.getToken(appData)).subscribe( (data: any) => {
      appData.data.companies.data = data.data;
      this.dataLoaded = true;
      SharedMethods.loader(false);
    });
  }

  public get companies() {
    return appData.data.companies.data;
  }

  navigate() {    
    SharedMethods.getCompanies(appData, this.companyService, (dt: any) => {
      appData.data.companies.data = dt.data;
    });
  }

}
