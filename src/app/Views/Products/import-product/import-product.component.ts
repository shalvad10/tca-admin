import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SectionsService } from 'src/app/Services/Http/sections.service';
import { CompanyService } from 'src/app/Services/Http/company.service';
import { ProductsService } from 'src/app/Services/Http/products.service';
import appData from 'src/app/Services/Data/AppData';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { Router } from '@angular/router';
import { getYear } from 'date-fns';
import locale from 'date-fns/locale/en-US';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-product',
  templateUrl: './import-product.component.html',
  styleUrls: ['./import-product.component.scss']
})
export class ImportProductComponent implements OnInit {

  products = [];
  days: any;
  startDate: any;
  endDate: any;
  quantity: any;
  selectedProductID: any = 0;
  selectedSectionID: number = 0;
  showWarnings: boolean = false;
  tooltipText  : string = 'შეავსეთ მხოლოდ იმ შემთხვევაში, თუ გსურთ შეცვალოთ ნაგულისხმევი (შემომტანი კომპანიისთვის წინასწარ გაწერილი) დღეების რაოდენობა.';

  options: any = {
    minYear: getYear(new Date()) - 30, // minimum available and selectable year
    maxYear: getYear(new Date()) + 30, // maximum available and selectable year
    placeholder: '', // placeholder in case date model is null | undefined, example: 'Please pick a date'
    format: 'dd MMMM yyyy', // date format to display in input
    formatTitle: 'MMMM yyyy',
    formatDays: 'EEEEE',
    firstCalendarDay: 0, // 0 - Sunday, 1 - Monday
    locale: locale, // date-fns locale
    position: 'bottom',
    inputClass: '', // custom input CSS class to be applied
    calendarClass: 'datepicker-default', // custom datepicker calendar CSS class to be applied
    scrollBarColor: '#ff0000', // in case you customize you theme, here you define scroll bar color
    keyboardEvents: true // enable keyboard events
  };

  constructor(
    private companyService  : CompanyService,
    private sectionsService : SectionsService,
    private productService  : ProductsService,
    private router          : Router,
    private toastrService   : ToastrService
  ) { }
  
  public get sections() {
    return appData.data.sections;
  }

  public get storeID() {
    return appData.data.currentUser.magazineBranchId;
  }


  ngOnInit(): void {
    SharedMethods.getProducts(appData, this.productService,(dt: any)=>{
      this.products = dt;
    });
    if ( appData.data.companies.data.length === 0 ) {
      this.companyService.getAll(SharedMethods.getToken(appData)).subscribe( (dt: any) => {
        appData.data.companies.data = dt.data;
      });
    }
    SharedMethods.getSections(appData, this.sectionsService, (dt: any) => {
      appData.data.sections = dt;
    });
  }

  public get isValidated() {
    return this.selectedProductID > 0 && this.startDate && this.endDate && this.quantity > 0 && this.selectedSectionID > 0
  }
  

  send() {
    if (this.endDate < this.startDate) {
      SharedMethods.alertNotification(this.toastrService,'danger', { text: `თარიღები არასწორად არის შეყვანილი`});
      return;
    }
    if ( this.isValidated) {
      SharedMethods.loader(true);
      this.productService.import(
        [{
          id: 0,
          registerDate: Date.parse(this.startDate).toString(),
          termDate: Date.parse(this.endDate).toString(),
          daysBeforeNotifiWarning: this.days,
          quantity: this.quantity,
          productId: this.selectedProductID,
          magazineBranchId: this.storeID,
          responsiblePersonsGroupId: this.selectedSectionID
        }],
        SharedMethods.getToken(appData)
      ).subscribe( res => {
        if (SharedMethods.isSuccess(res)) {
          SharedMethods.loader(false);
          this.router.navigateByUrl('/products');
        }
        console.warn(res);
      });
    } else {
      this.showWarnings = true;
    }
  }

}
