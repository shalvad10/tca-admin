import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import appData from 'src/app/Services/Data/AppData';
import { ProductsService } from 'src/app/Services/Http/products.service';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import { ReasonsService } from 'src/app/Services/Http/reasons.service';

@Component({
  selector: 'modal-deletion',
  templateUrl: './deletion.component.html',
  styleUrls: ['./deletion.component.scss']
})
export class DeletionComponent implements OnInit {

  selected: number = null;
  quantity: number = 0;

  @Input() modalParams: any;


  constructor(private productService: ProductsService, private toastr: ToastrService, private reasonsService: ReasonsService) { }

  ngOnInit(): void {
    if (appData.data.PRReasons.length === 0) {
      this.reasonsService.getAll(SharedMethods.getToken(appData)).subscribe( (data: any) => {
        if ( data ) {
          appData.data.PRReasons = data;
        }
      });
    }
  }


  get reasons() {
    return appData.data.PRReasons;
  }


  makeChanges(type:string, ev: any) {
    switch (type) {
      case 'select': {
        this.selected = Number.parseInt(ev.target.options[ev.target.options.selectedIndex].value);
        break;
      }
      case 'input': {
        this.quantity = Number.parseInt(ev.target.value);
        break;
      }
    }
  }


  confirm(): void {
    if ( this.selected !== null ) {
      if (this.quantity > this.modalParams.productQuantity) {
        SharedMethods.alertNotification(this.toastr, 'danger', { text: `მაღაზიაში აღნიშნული პროდუქტის საერთო რაოდენბაა: ${this.modalParams.productQuantity}`});
        this.quantity = this.modalParams.productQuantity;
      } else {
        this.productService.removeProduct(this.modalParams.productToBranchID,this.selected,this.quantity, SharedMethods.getToken(appData)).subscribe( (data: any) => {
          if ( data ) {
            appData.data.products = appData.data.products.filter( pr => pr.itemID !== data.productToBranch.id);
            appData.data.modal.currentModal = '';
            SharedMethods.alertNotification(this.toastr, 'success', { text: `ოპერაცია წარმატებით განხორციელდა`});
          }
        });
      }
    }
  }

  deny(): void {
    appData.data.modal.currentModal = '';
  }

}
