import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppEnums } from 'src/app/Enums/appEnums';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { CompanyService } from 'src/app/Services/Http/company.service';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';
import { UserService } from 'src/app/Services/Http/user.service';
// import AppData from 'src/app/Data/AppData';
import { ProductsService } from 'src/app/Services/Http/products.service';
import { SectionsService } from 'src/app/Services/Http/sections.service';
import { ReasonsService } from 'src/app/Services/Http/reasons.service';
import { MagazineBranchesService } from 'src/app/Services/Http/magazine-branches.service';

@Component({
  selector: 'modal-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  @Input() modalParams: any;
  constructor(
    private toastr                : ToastrService,
    private userService           : UserService,
    private sectionsService       : SectionsService,
    private magazineService       : MagazinesService,
    private companyService        : CompanyService,
    private productsService       : ProductsService,
    private reasonsService        : ReasonsService,
    private magazineBranchService : MagazineBranchesService
    ) { }

  ngOnInit(): void { }

  public get typeName() {
    switch(this.modalParams.typeID) {
      case 1 : { return 'პროდუქტის';  }
      case 2 : { return 'მომხმარებლის'; }
      case 3 : { return 'ფილიალის';   }
      case 4 : { return 'კომპანიის';  }
      case 5 : { return 'სექციის';  }
      case 6 : { return 'მიზეზის';  }
      case 8 : { return 'პოზიციის';  }
    }
  }

  public get typeAction() {
    if (this.modalParams.activityID === AppEnums.activityID.user_DFSTORE) {
      return 'ამოშლა ფილიალიდან?';
    }
    if (this.modalParams.activityID === AppEnums.activityID.user_DFSECTION) {
      return 'ამოშლა სექციიდან?';
    }
    return 'წაშლა?';
  }

  deny() {
    appData.data.modal.currentModal = '';
  }

  confirm() {
    SharedMethods.loader(true);
    switch(this.modalParams.typeID) {
      case AppEnums.main.product      : { this.deleteProduct(this.modalParams.targetID);      break;  }
      case AppEnums.main.user         : { this.deleteUser();                                  break;  }
      case AppEnums.main.userRole     : { this.deleteUser();                                  break;  }
      case AppEnums.main.store        : { this.deleteStore(this.modalParams.targetID);        break;  }
      case AppEnums.main.storeBranch  : { this.deleteStoreBranch(this.modalParams.targetID);  break;  }
      case AppEnums.main.company      : { this.deleteCompany(this.modalParams.targetID);      break;  }
      case AppEnums.main.section      : { this.deleteSection(this.modalParams.targetID);      break;  }
    }
  }


  deleteProduct(id: number) {
    this.productsService.delete(id, SharedMethods.getToken(appData)).subscribe((data: any) => {
      console.warn(data);
      if (SharedMethods.isSuccess(data)) {
        SharedMethods.loader(false);
        appData.data.modal.currentModal = '';
        SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
        appData.data.products = [].concat(appData.data.products.filter( product => product.id !== id));
      }
    });
  }


  deleteSection(id) {
    this.sectionsService.delete(id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
      if (SharedMethods.isSuccess(dt)) {
        SharedMethods.loader(false);
        appData.data.modal.currentModal = '';
        SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
        appData.data.sections = [].concat(appData.data.sections.filter( section => section.id !== id));
      }
    });
  }

  deleteUser()  {
    switch(this.modalParams.activityID) {
      case AppEnums.activityID.user_DELETE  : {
        break;
      }
      case AppEnums.activityID.user_DFSTORE : {
        this.userService.removeFromStore(this.modalParams.data.userID, SharedMethods.getToken(appData)).subscribe((dt: any) => {
          if (SharedMethods.isSuccess(dt)) {
            SharedMethods.loader(false);
            appData.data.stores.selectedStore.users =  appData.data.stores.selectedStore.users.filter(usr => usr.id !== this.modalParams.data.userID);
            appData.data.modal.currentModal = '';
          }
        });
        break;
      }
      case AppEnums.activityID.user_DFSECTION : {
        this.userService.removeFromSection(this.modalParams.data.userID, this.modalParams.data.sectionID, SharedMethods.getToken(appData)).subscribe((dt: any) => {
          if (SharedMethods.isSuccess(dt)) {
            SharedMethods.loader(false);
            appData.data.modal.currentModal = '';
            SharedMethods.getSectionsWithData(appData, this.sectionsService);
          }
        });
        break;
      }
      case AppEnums.activityID.reasons_DELETE : {
        this.reasonsService.delete(this.modalParams.data.userID, SharedMethods.getToken(appData)).subscribe((dt: any) => {
          if (SharedMethods.isSuccess(dt)) {
            SharedMethods.loader(false);
            appData.data.modal.currentModal = '';
            SharedMethods.getSectionsWithData(appData, this.productsService);
          }
        });
        break;
      }
      case AppEnums.activityID.user_DELROLE : {
        this.userService.deleteUserRole(this.modalParams.data.roleID, SharedMethods.getToken(appData)).subscribe((dt: any) => {
          console.warn(dt);
          if (SharedMethods.isSuccess(dt)) {
            SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
            SharedMethods.getUsedRoles(this.userService,0, (data: any) => {
              appData.data.users.usedRolesList = data;
              SharedMethods.loader(false);
            });
            appData.data.modal.currentModal = '';
          }
        });
        break;
      }
    }
  }

  deleteStore(id)   {    
    this.magazineService.delete(id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
      if (SharedMethods.isSuccess(dt)) {
        SharedMethods.loader(false);
        appData.data.modal.currentModal = '';
        SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
        appData.data.stores.allStores = appData.data.stores.allStores.filter( store => store.id !== id);
      }
    });
  }

  deleteStoreBranch(id)   {    
    this.magazineBranchService.delete(id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
      if (SharedMethods.isSuccess(dt)) {
        SharedMethods.loader(false);
        appData.data.modal.currentModal = '';
        SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
        appData.data.stores.allStores = appData.data.stores.allStores.filter( store => store.id !== id);
      }
    });
  }
  
  deleteCompany(id) {
    this.companyService.delete(id, SharedMethods.getToken(appData)).subscribe( (res: any) => {
      if (SharedMethods.isSuccess(res)) {
        SharedMethods.loader(false);
        appData.data.modal.currentModal = '';
        SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
        appData.data.companies.data = appData.data.companies.data.filter( company => company.id !== id);
      }
    } );;
  }

}
