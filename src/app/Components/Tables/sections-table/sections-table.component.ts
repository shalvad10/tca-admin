import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnums } from 'src/app/Enums/appEnums';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { UserService } from 'src/app/Services/Http/user.service';

@Component({
  selector: 'app-sections-table',
  templateUrl: './sections-table.component.html',
  styleUrls: ['./sections-table.component.scss']
})
export class SectionsTableComponent implements OnInit {

  tableData = [];
  dataLoaded = false;

  constructor(private router: Router, private userService: UserService) { }

  @Input() set data(val: any) {
    // this.tableData = val;
    this.dataLoaded = true;
  }

  get sectionsData() {
    return appData.data.sections;
  }

  ngOnInit() {
    SharedMethods.getUsers(appData,this.userService, (data) => {
      console.warn(data.data);
      appData.data.users.data = data.data;
    });
  }

  delete(id, name) {
    const modal = 'confirm';
    appData.data.modal.currentModal = modal;
    appData.data.modal.modals[modal].typeID     = AppEnums.main.section;
    appData.data.modal.modals[modal].targetName = name;
    appData.data.modal.modals[modal].targetID   = id;
  }

  addUser(section: any) {
    const modal                                 = 'konsultantebi';
    appData.data.modal.currentModal             = modal;
    appData.data.modal.modals[modal].users      = section.users;
    appData.data.modal.modals[modal].sectionID  = section.section.id;
  }

  avatar(id) {
    return appData.data.avatars[Number.parseInt(id)];
  }

  name(user) {
    return `${user.firstName} ${user.lastName}`;
  }

  edit(section) {
    // AppData.data.selectedSection = section;
    this.router.navigateByUrl('sections/add');
  }

  goToProducts() {
    this.router.navigateByUrl('products');
  }

  get users() {
    return appData.data.users.data;
  }

}
