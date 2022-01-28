import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { MagazineBranchesService } from 'src/app/Services/Http/magazine-branches.service';

@Component({
  selector: 'app-store-branch-detailed',
  templateUrl: './store-branch-detailed.component.html',
  styleUrls: ['./store-branch-detailed.component.scss']
})
export class StoreBranchDetailedComponent implements OnInit {

  constructor(
    private activatedRoute  : ActivatedRoute,
    private magazineBranchesService : MagazineBranchesService
  ) { }

  id: number;

  tableData = [];

  ngOnInit(): void {
    this.id = Number.parseInt(this.activatedRoute.snapshot.params.id);
    this.magazineBranchesService.getByID(this.id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
      if (dt) {
        appData.data.stores.selectedStore = {
          id: dt.id,
          name: dt.name,
          store: this.getStoreName(dt.magazineId),
          location: dt.location,
          idCode: dt.identificationCode,
          users: []
        }
        this.magazineBranchesService.getUsers(dt.id, SharedMethods.getToken(appData)).subscribe( (res: any) => {
          let tmpArr = [];
          res.forEach( (el: any) => {
            tmpArr.push({
              id: el.user.id,
              name: `${el.user.firstName} ${el.user.lastName}`,
              role: el.positions.name
            });
          });
          appData.data.stores.selectedStore.users = tmpArr;
          console.warn(appData.data.stores.selectedStore.users);
        });
      }
      SharedMethods.loader(false);
    });
  }
  public get data(): any {
    return appData.data.stores.selectedStore;
  }

  public get employeeCount(): number {
    return appData.data.stores.selectedStore.users.length;
  }

  getStoreName(id) {
    let store = {
      name: '',
      id: 0,
      idCode: ''
    };
    this.magazineBranchesService.getStore(id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
      store.id = dt.id;
      store.idCode = dt.identificationCode;
      store.name = dt.name;
    });
    return store;
  }
  
  addUsertoStore() {
    const modal = 'addUser';
    appData.data.modal.currentModal           = modal;
    appData.data.modal.modals[modal].storeID  = this.id;
    appData.data.modal.modals[modal].type     = 'store';
  }
}
