import { Component, OnInit } from '@angular/core';
import { MagazinesService } from 'src/app/Services/Http/magazines.service';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { ToastrService } from 'ngx-toastr';
import appData from 'src/app/Services/Data/AppData';
import { UserService } from 'src/app/Services/Http/user.service';
import { CompanyService } from 'src/app/Services/Http/company.service';
import { ProductsService } from 'src/app/Services/Http/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  
  constructor(
    private productService  : ProductsService,
    private companyService  : CompanyService,
    private userService     : UserService,
    private magazineService : MagazinesService,
    private toastrService   : ToastrService
  ) { }

  reduceStores = false;
  showUsers = false;
  users          = [];

  get avatars() {
    return appData.data.avatars;
  }

  get data(): any {
    return appData.data;
  }


  openDetails(ev: any){
    // this.magazineService.getUsers(ev).subscribe( (dt: any) => {
    //   if (dt.length > 0) {
    //     this.users = dt;
    //       this.reduceStores = true;
    //       setTimeout(() => {
    //         this.showUsers = true;
    //       }, 500);
    //   } else {
    //     SharedMethods.alertNotification(this.toastrService,'danger', { text: `ფილიალში დასაქმებულთა რაოდენობა 0-ის ტოლია.`});
    //   }
    // });
  }

  removeList(){ 
    this.users = [];
    this.reduceStores = false;
    this.showUsers = false;
  }

  chart1 = {
    show: true,
    labels: ['იან','თებ','მარ','აპრ','მაი','ივნ','ივლ','აგვ','სექ','ოქტ','ნოე','დეკ'],
    data: [
      {
        name: 'მიღებული',
        data: [0,0,0,5,42,12,3,8,9,12,6,24],
        color: '#00a300'
      },
      {
        name: 'ამოღებული',
        data: [0,0,0,32,6,19,31,13,9,17,3,7],
        color: '#d90000'
      }
    ]
  };
  

  infoBoxses = [
    { id: 'users',      title: 'თანამშრომლები', type: 'info',       content: 0,   icon: 'fa-users'      },
    { id: 'products',   title: 'პროდუქცია',     type: 'secondary',  content: 0,   icon: 'fa-sitemap'    },
    { id: 'stores',     title: 'ფილიალები',     type: 'success',    content: 0,   icon: 'fa-store-alt'  },
    { id: 'companies',  title: 'მომწოდებლები',  type: 'warning',    content: 0,   icon: 'fa-building'   }
  ];

  warningItems = [];

  get chartWidth(){
    return document.getElementById('chartBlock').clientWidth;
  }

  ngOnInit(): void {

    // SharedMethods.setInfoBoxes( appData, this.infoBoxses, 'companies', this.companyService.getAll(SharedMethods.getToken(appData)));

    SharedMethods.setInfoBoxes( appData, this.infoBoxses, 'stores', this.magazineService.getAll(SharedMethods.getToken(appData)));

    // SharedMethods.setInfoBoxes( appData, this.infoBoxses, 'users', this.userService.allUsers(SharedMethods.getToken(appData)));
    
    // SharedMethods.setInfoBoxes( appData, this.infoBoxses, 'products', this.productService.getAll(SharedMethods.getToken(appData)));
  }

  assignInfoboxes(data, boxID){
    const infoBOX: any = this.infoBoxses.filter( box => box.id == boxID)[0];
    infoBOX.content = data;
  }

}
