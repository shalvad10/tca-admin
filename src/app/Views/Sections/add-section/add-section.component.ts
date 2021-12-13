import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Http/user.service';
import { SectionsService } from 'src/app/Services/Http/sections.service';
import { ComponentBase } from 'src/app/Components/Base/ComponentBase';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { Router } from '@angular/router';
import appData from 'src/app/Services/Data/AppData';
// import AppData from 'src/app/Data/AppData';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent extends ComponentBase implements OnInit {

  sectionName: string = '';
  users = [];
  selectedUsers = [];
  isEdit = false;
  section = undefined;
  showWarnings = false;


  constructor( private router: Router ,ref: ChangeDetectorRef, private userService: UserService, private sectionsService: SectionsService) {
    super(ref);
  }

  ngOnInit(): void {
    // this.section = AppData.data.selectedSection;
    // this.userService.allUsers().subscribe( (res: any) => {
    //   res.data.forEach( user => {
    //     this.users.push({ name: `${user.name} ${user.surname}`, id: user.id });
    //   });
    // });
    if ( this.section !== undefined ) {
      this.isEdit = true;
      this.section.users.forEach( user  => {
        this.selectedUsers.push(user.id.toString());
      });
      this.sectionName = this.section.name;
    }
  }

  selectUsers(ev) {
    this.selectedUsers = [];
    for (let i = 0; i < ev.target.options.length; i++) {
      if (ev.target.options[i].selected) {
        this.selectedUsers.push(ev.target.options[i].value);
      }
    }
  }

  addSection() {
    if ( this.sectionName.length > 0) {
      SharedMethods.loader(true);
      if ( this.isEdit ) {
        this.sectionsService.edit(this.sectionName, this.selectedUsers, this.section.id, SharedMethods.getToken(appData)).subscribe(res => {
          // AppData.data.activeModal = 'info';
          // AppData.data.selectedSection = undefined;
        });
      } else {
        this.sectionsService.create(this.sectionName, SharedMethods.getToken(appData)).subscribe(res => {
          // AppData.data.activeModal = 'info';
          if ( SharedMethods.isSuccess(res) ) {
            SharedMethods.loader(false);
            this.router.navigateByUrl('/sections');
          }
        });
      }
    } else {
      this.showWarnings = true;
    }
  }

}
