import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/Http/user.service';
import { SectionsService } from 'src/app/Services/Http/sections.service';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
// import AppData from 'src/app/Data/AppData';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html',
  styleUrls: ['./sections-list.component.scss']
})
export class SectionsListComponent implements OnInit {

  constructor( private sectionsService: SectionsService, private usersService: UserService) { }

  dataLoaded = false;
  sectionsLengtht = 0;
  allUsers = [];
  test = 0;

  teeest() {
    
  }

  ngOnInit(): void {
    this.sectionsService.getAllWithData(SharedMethods.getToken(appData)).subscribe( (res: any) => {
      console.error(res);
      this.sectionsLengtht = res.length;
        appData.data.sections = res;
        this.dataLoaded = true;
    });
  }

  public get sectionsList() {
    return appData.data.sections;
  }

}
