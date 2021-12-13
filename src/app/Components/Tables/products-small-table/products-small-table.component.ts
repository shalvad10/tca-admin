import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { ProductsService } from 'src/app/Services/Http/products.service';

@Component({
  selector: 'app-products-small-table',
  templateUrl: './products-small-table.component.html',
  styleUrls: ['./products-small-table.component.scss']
})
export class ProductsSmallTableComponent implements OnInit {

  constructor(private router: Router, private productsService: ProductsService) { }

  public tableHeight = '300px';

  @Input() data: any;
  @Input() companyName: any;
  @Input() set height(val: any){
    this.tableHeight = val+'px';
  }

  ngOnInit() { 
    console.error(this.data);
  }

  delete(id) {
    this.productsService.delete(id, SharedMethods.getToken(appData)).subscribe( (dt: any) => {
      console.warn(dt);
      if ( SharedMethods.isSuccess(dt) ) { 
        const tmpArr = this.data.filter( pr => pr.id !== id);
        this.data = Object.assign(tmpArr, {})
      }
    });
  }

}
