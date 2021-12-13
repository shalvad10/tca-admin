import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppEnums } from 'src/app/Enums/appEnums';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { SectionsService } from 'src/app/Services/Http/sections.service';
import { UserService } from 'src/app/Services/Http/user.service';

@Component({
  selector: 'modal-konsultantebi',
  templateUrl: './konsultantebi.component.html',
  styleUrls: ['./konsultantebi.component.scss']
})
export class KonsultantebiComponent implements OnInit {

  tableData = [];
  tableHeight = 340;
  selectedTab: string = 'users-tab';

  @Input() modalParams: any;
   fields = ['id', 'name', 'role'];
   users = [];
   allUsers = [];
   selected = 0;
  
  constructor( private userService: UserService, private toastrService: ToastrService, private sectionsService: SectionsService) { }

  ngOnInit(): void {
    this.users = this.refactorUsers;
    this.allUsers = this.refactorAllUsers;
  }

  delete(val) {

  }

  confirm() {
    this.userService.registerToSection(this.selected, this.modalParams.sectionID, SharedMethods.getToken(appData)).subscribe((data: any) => {
      if (data) {
        appData.data.modal.currentModal = '';
        SharedMethods.alertNotification(this.toastrService,'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
        SharedMethods.getSectionsWithData(appData, this.sectionsService);
      }
    });
  }
  deny() {1
    this.data.modal.currentModal = '';
  }

  public get refactorUsers() {
    let usersTMP = [];
    this.modalParams.users.forEach( user => {
        usersTMP.push({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          role: user.position
        });
    });
    return usersTMP;
  }

  public get refactorAllUsers() {
    let usersTMP = [];
    this.data.users.data.forEach( user => {
      if (user.positionId == AppEnums.userPositions.Consultant) {
        usersTMP.push({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          role: user.position
        });
      }
    });
    return usersTMP;
  }

  public get data() {
    return appData.data;
  }

  selectTab(tb: string) {
    this.selectedTab = tb;
  }

}
