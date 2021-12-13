import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { CompanyService } from 'src/app/Services/Http/company.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyName   : string  = '';
  companyCode   : string  = '';
  id            : number;
  days          : number;
  showWarnings  : boolean = false;

  isValidated = {
    code: false,
    name: false,
    showWarnings: false
  }

  constructor( private router:Router, private toastr: ToastrService ,private activatedRoute: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.id) {
      SharedMethods.loader(true);
      this.id = Number.parseInt(this.activatedRoute.snapshot.queryParams.id);
      this.companyService.getSingle(this.id, SharedMethods.getToken(appData)).subscribe((dt: any) => {
        if (dt) {
          console.error(dt);
          this.companyCode   = dt.identificationCode;
          this.companyName   = dt.name;
          this.days          = dt.defaultDaysBeforeNotifiWarning;
          SharedMethods.loader(false);
        }
      });
    }
  }

  public get text() {
    return this.id == undefined ? 'დამატება' : 'განახლება';
  }

  addCompany() {
    if (this.companyCode.length > 0 && this.companyName.length > 0 ) {
      SharedMethods.loader(true);
      if ( this.id == undefined) {
        this.companyService.create(this.companyCode, this.companyName, this.days, SharedMethods.getToken(appData)).subscribe((res: any) => {
          if (res) {
            SharedMethods.alertNotification(this.toastr, 'success', { text: `კომპანია წარმატებით დაემატა.`});
            setTimeout(() => {
              if (appData.data.companies.data.length > 0) {
                appData.data.companies.data = appData.data.companies.data.filter( comp => comp.id !== res.id);
                appData.data.companies.data.push(res);
              }
              SharedMethods.loader(false);
              this.router.navigateByUrl('/companies');
            }, 1500);
          }
        });
      } else {
        this.companyService.edit(this.companyCode, this.companyName, this.id, this.days, SharedMethods.getToken(appData)).subscribe((res: any) => {
          if (res) {
            SharedMethods.alertNotification(this.toastr, 'success', { text: `კომპანიის განახლება წარმატებით განხორციელდა.`});
            if (appData.data.companies.data.length > 0) {
              appData.data.companies.data = appData.data.companies.data.filter( comp => comp.id !== res.id);
              appData.data.companies.data.push(res);
            }
            setTimeout(() => {
              SharedMethods.loader(false);
              this.router.navigateByUrl('/companies');
            }, 1500);
          }
        });
      }
    } else {
      this.showWarnings = true;
    }
  }

}
