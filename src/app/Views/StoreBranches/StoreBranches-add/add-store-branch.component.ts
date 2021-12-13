import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { MagazineBranchesService } from 'src/app/Services/Http/magazine-branches.service';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';

@Component({
  selector: 'app-add-store-branch',
  templateUrl: './add-store-branch.component.html',
  styleUrls: ['./add-store-branch.component.scss']
})
export class AddStoreBranchComponent implements OnInit {

  IDCode          : string  = '';
  name            : string  = '';
  lct             : string  = '';
  id              : number;
  showWarnings    : boolean = false;
  selectedStoreID : number;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private magazineBranchService: MagazineBranchesService,
    private magazineService: MagazinesService
  ) { }

  ngOnInit(): void {
    if (appData.data.stores.allStores.length == 0) {
      this.magazineService.getAll(SharedMethods.getToken(appData)).subscribe( (data: any) => {
        appData.data.stores.allStores = data.data;
      })
    }
    if (this.activatedRoute.snapshot.queryParams.id) {
      this.id = Number.parseInt(this.activatedRoute.snapshot.queryParams.id);
      this.magazineBranchService.getByID(this.id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
        this.IDCode   = dt.identificationCode;
        this.name     = dt.name;
        this.lct = dt.location;
      });
    }
  }

  public get text() {
    return this.id == undefined ? 'დამატება' : 'განახლება';
  }
  
  send() {
    if (this.IDCode.length > 0 && this.name.length > 0 && this.lct.length > 0) {
      SharedMethods.loader(true);
      this.magazineBranchService.create(this.IDCode, this.name, this.lct, this.selectedStoreID, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
        console.warn(dt);
        if ( dt) {
          appData.data.stores.allStores.push(dt);
          SharedMethods.loader(false);
          SharedMethods.alertNotification(this.toastr,'success', { text: `ოპერაცია წარმატებით განხორციელდა`})
          this.router.navigateByUrl('store');
        }
      });
    } else {
      this.showWarnings = true
    }
  }
  
  edit() {
    if (this.IDCode.length > 0 && this.name.length > 0 && this.lct.length > 0) {
      this.magazineBranchService.edit(this.IDCode, this.name, this.id, this.lct, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
        console.warn(dt);
        if ( dt ) {
          appData.data.stores.allStores = appData.data.stores.allStores.filter( st => st.id !== dt.id);
          setTimeout( () => {
            appData.data.stores.allStores.push(dt);
            SharedMethods.alertNotification(this.toastr,'success', { text: `ოპერაცია წარმატებით განხორციელდა`})
            this.router.navigateByUrl('store');
          }, 1);
        }
      });
    } else {
      this.showWarnings = true
    }
  }

  get stores() {
    return appData.data.stores.allStores;
  }

}
