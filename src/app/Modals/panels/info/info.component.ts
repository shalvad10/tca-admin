import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SharedMethods from 'src/app/Helpers/SharedMethods';
import appData from 'src/app/Services/Data/AppData';
import { ComponentBase } from '../../../../app/Components/Base/ComponentBase';

@Component({
  selector: 'modal-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent extends ComponentBase implements OnInit {

  constructor(ref: ChangeDetectorRef, private router: Router) {
    super(ref);
  }

  @Input() modalParams: any;

  public get actionName() {
    return SharedMethods.getAction(this.modalParams.actionID);
  }

  public get text() {
    return this.modalParams.text;
  }

  ngOnInit(): void { 
    setTimeout( () => {
      appData.data.modal.currentModal = '';
    }, 3000);
  }

}
