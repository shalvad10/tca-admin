import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import appData from 'src/app/Services/Data/AppData';

@Component({
  selector: 'app-menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.scss']
})
export class MenuPanelComponent implements OnInit {

  constructor( private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit() { }

  dropdownMenu(id: any) {
    document.getElementById(id).classList.toggle('menu-open');
  }

  get user() {
    return `${appData.data.currentUser.firstName} ${appData.data.currentUser.lastName}`;
  }

  get avatar() {
    return appData.data.avatars[appData.data.currentUser.avatarID];
  }

  changeRoute(param: any) {
    switch ( param ) {
      case '/'                : { this.router.navigateByUrl('');                  break;  }
      case 'userList'         : { this.router.navigateByUrl('/users');            break;  }
      case 'addUser'          : { this.router.navigateByUrl('/users/register');   break;  }
      case 'productList'      : { this.router.navigateByUrl('/products');         break;  }
      case 'addProduct'       : { this.router.navigateByUrl('/products/add');     break;  }
      case 'productLogs'      : { this.router.navigateByUrl('/products/logs');    break;  }
      case 'addStore'         : { this.router.navigateByUrl('/store/add');        break;  }
      case 'storesList'       : { this.router.navigateByUrl('/store');            break;  }
      case 'addStoreBranch'   : { this.router.navigateByUrl('/storeBranch/add');  break;  }
      case 'storeBranchsList' : { this.router.navigateByUrl('/storeBranch');      break;  }
      case 'sectionList'      : { this.router.navigateByUrl('/sections');         break;  }
      case 'addSection'       : { this.router.navigateByUrl('/sections/add');     break;  }
      case 'CompanyList'      : { this.router.navigateByUrl('/companies');        break;  }
      case 'addCompany'       : { this.router.navigateByUrl('/companies/add');    break;  }
      case 'ReasonsList'      : { this.router.navigateByUrl('/reasons');          break;  }
      case 'addReason'        : { this.router.navigateByUrl('/reasons/add');      break;  }
      case 'userRolesList'    : { this.router.navigateByUrl('/userRoles');        break;  }
      case 'addUserRoles'     : { this.router.navigateByUrl('/userRoles/add');    break;  }
    }
  }

  isActive(param: any) {
    const activeURL = this.activeRoute.snapshot['_routerState'].url;
    return '/'+ param == activeURL;
  }

  userProfile() {
    this.router.navigateByUrl('');
    setTimeout(() => {
      this.router.navigateByUrl(`/users/${appData.data.currentUser.id}`);
    }, 0);
  }

}
