import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { CompanyService } from 'src/app/Services/Http/company.service';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {

  tableData = [];
  windowWidth;
  searchText;
  public tableHeight = '550px';

  constructor(private router: Router, private compayService: CompanyService) { }

  @Input() set data(val: any) {
    this.tableData = [];
    val = val.sort((a,b) => (a.name > b.name) ? 1 : ((b.id > a.id) ? -1 : 0))
    console.warn(val);
    val.forEach( item => {
      const tmpItem = {
        id: item.id,
        name: item.name,
        code: item.identificationCode,
        products: item.productsCount,
        receivedBack: 0
      };
      this.tableData.push(tmpItem);
    });
  }

  ngOnInit() {
    window.addEventListener('resize', (ev) => {
      this.windowWidth = ev.target['innerWidth'];      
    });
  }

  delete(id, name) {
    const modal = 'confirm';
    appData.data.modal.currentModal = modal;
    appData.data.modal.modals[modal].typeID     = AppEnums.main.company;
    appData.data.modal.modals[modal].targetName = name;
    appData.data.modal.modals[modal].targetID   = id;
  }

  edit(id) {
    this.router.navigate(['companies/add'], { queryParams: { id: id } });
  }

  companyDetails(id) {
    this.router.navigateByUrl(`/companies/${id}`);
  }

  getCompany(id) {
    this.compayService.getSingle(id, SharedMethods.getToken(appData)).subscribe( res => console.warn('edit', res) );
  }

  public get isStore(): boolean {
    return SharedMethods.isStoreView();
  }

}
