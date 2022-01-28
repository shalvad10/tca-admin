import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/Http/user.service';
import { ComponentBase } from '../../../../app/Components/Base/ComponentBase';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { __assign } from 'tslib';

@Component({
  selector: 'modal-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserModal extends ComponentBase implements OnInit {

  constructor(ref: ChangeDetectorRef, private userService: UserService, private toastrService: ToastrService) {
    super(ref);
  }

  selected          :  number  = 0;
  selectedPosition  :  number  = 0;
  dataLoaded        :  boolean = false;

  @Input() modalParams: any;

  public get users(): any {
    return appData.data.users.data;
  }

  public get positions(): any {
    return appData.data.users.positions;
  }

  getUser(usr) {
    return `${usr.firstName} ${usr.lastName}`
  }

  refactorData(data: any) {
    data.forEach(element => {
      element.name = `${element.firstName} ${element.lastName}`
    });
    this.dataLoaded = true;
  }
  
  ngOnInit(): void {
    SharedMethods.getPositions(this.userService);
    console.warn(this.modalParams);
    if (appData.data.users.data.length == 0) {
      SharedMethods.getUsers(appData,this.userService, (rs: any) => {
        if ( SharedMethods.isSuccess(rs)) {
          appData.data.users.data = rs.data;
          this.refactorData(appData.data.users.data);
          SharedMethods.loader(false);
        }
      });
    }else {
      this.refactorData(appData.data.users.data);
      SharedMethods.loader(false);
    }
  }

  deny() {
    appData.data.modal.currentModal = '';
  }

  selectChange(ev) {
    this.selected = Number.parseInt(ev.target.options[ev.target.options.selectedIndex].value);
  }

  confirm() {
    const token = SharedMethods.getToken(appData);
    switch (this.modalParams.type) {
      case 'store': {
        this.userService.registerToStore(this.selected, this.selectedPosition, this.modalParams.storeID, token).subscribe((data: any) => {
          if (data) {
            const user = this.users.find( usr => usr.id === this.selected);
            this.userService.getUserPosition(data.positionId, token).subscribe( (dt: any) => {
              const tmpUser = {
                id: this.selected,
                name: user.name,
                role: dt.name
              };
              appData.data.stores.selectedStore.users.push(tmpUser);
              appData.data.modal.currentModal = '';
              SharedMethods.alertNotification(this.toastrService,'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
            });
          }
        });
        break;
      }
      case 'section': {
        this.userService.registerToSection(this.selected, this.modalParams.sectionID, SharedMethods.getToken(appData)).subscribe((data: any) => {
          console.warn(data);
          if (data) {
            appData.data.modal.currentModal = '';
            SharedMethods.alertNotification(this.toastrService,'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
          }
        });
        break;
      }
    }
  }

}
