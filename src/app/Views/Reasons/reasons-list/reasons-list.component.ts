import { Component, OnInit } from '@angular/core';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { ProductsService } from 'src/app/Services/Http/products.service';
import { ReasonsService } from 'src/app/Services/Http/reasons.service';

@Component({
  selector: 'app-reasons-list',
  templateUrl: './reasons-list.component.html',
  styleUrls: ['./reasons-list.component.scss']
})
export class ReasonsListComponent implements OnInit {

  dataLoaded  = false;

  constructor(private reasonsService: ReasonsService) { }

  ngOnInit(): void {
    this.reasonsService.getAll(SharedMethods.getToken(appData)).subscribe( (data: any) => {
      console.warn(data);
      if ( data ) {
        appData.data.PRReasons = data;
      }
    });
  }

  public get tableData() {
    return appData.data.PRReasons;
  }

}
