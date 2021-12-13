import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/Http/products.service';
import { Router } from '@angular/router';
import appData from 'src/app/Services/Data/AppData';
import { ToastrService } from 'ngx-toastr';
import SharedMethods from 'src/app/Helpers/SharedMethods';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  oldDropdown = null;

  constructor( private router: Router ,private productService: ProductsService, private toastrService: ToastrService) { }

  ngOnInit() { }

  toggleDropdown(id: any) {
    if ( id === 'messages') {
      if (this.notifications.length > 0) {
        if (this.oldDropdown !== null && this.oldDropdown !== id) {
          document.getElementById(this.oldDropdown).getElementsByClassName('dropdown-menu')[0].classList.remove('show');
        }
        document.getElementById(id).getElementsByClassName('dropdown-menu')[0].classList.toggle('show');
        this.oldDropdown = id;
      }
    } else {
      if (this.oldDropdown !== null && this.oldDropdown !== id) {
        document.getElementById(this.oldDropdown).getElementsByClassName('dropdown-menu')[0].classList.remove('show');
      }
      document.getElementById(id).getElementsByClassName('dropdown-menu')[0].classList.toggle('show');
      this.oldDropdown = id;
    }
  }

  toggleSidebar() {
    const body = document.body;
    body.classList.toggle('sidebar-collapse');
    body.classList.toggle('sidebar-open');
  }


  openNotification(el: any) {
    this.toggleDropdown('messages');
    SharedMethods.alertNotification(this.toastrService, el.type, { text: el.text});
    appData.data.notifications.splice(appData.data.notifications.indexOf(el),1);
  }


  onSubmit(ev: any) {
    const value = document.getElementById('searchValue')['value'];
    if (isNaN(Number.parseInt(value))) {
      if (appData.data.products.length > 0) {
        const id = appData.data.products.filter( pr => pr.name === value )[0].id;
        setTimeout( () => {
          this.router.navigateByUrl(`/products/${id}`);
        }, 1000);
      } else {
        this.productService.getAll(SharedMethods.getToken(appData)).subscribe( (dt: any) => {
          const id = appData.data.products.filter( pr => pr.name === value )[0].id;
          setTimeout( () => {
            this.router.navigateByUrl(`/products/${id}`);
          }, 1000);
        } );
      }
    } else {
      if (appData.data.products.length > 0) {
        const id = appData.data.products.filter( pr => pr.identificationCode === value )[0].id;
        console.warn(appData.data.products);
        setTimeout( () => {
          this.router.navigateByUrl(`/products/${id}`);
        }, 1000);
      } else {
        this.productService.getAll(SharedMethods.getToken(appData)).subscribe( (dt: any) => {
          const id = dt.data.filter( pr => pr.identificationCode === value )[0].id;
          setTimeout( () => {
            this.router.navigateByUrl(`/products/${id}`);
          }, 1000);
        } );
      }
    }
    return false;
  }

  public get notifications() {
    return appData.data.notifications;
  }

  onSearch(data) {
    console.warn(data);
  }

  lock() {
    let user = JSON.parse(window.localStorage.getItem('authorizedUser'));
    console.warn(user);
    user['password'] = '';
    window.localStorage.setItem('authorizedUser', JSON.stringify(user));
    this.router.navigateByUrl("/locked");
  }
  logout() {
    window.localStorage.removeItem('authorizedUser');
    this.router.navigateByUrl("/users/auth");
  }

  userProfile() {
    this.router.navigateByUrl(`/users/${appData.data.currentUser.id}`);
  }

}
