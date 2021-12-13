import { Component,  ChangeDetectorRef, Input } from '@angular/core';
import { ComponentBase } from '../../app/Components/Base/ComponentBase';

@Component({
  selector: 'app-modal',
  templateUrl: './app-modal.component.html',
  styleUrls: ['./app-modal.component.scss']
})
export class AppModalComponent extends ComponentBase {
  @Input() modal: any;
  @Input() title: any;
  

  constructor(ref:ChangeDetectorRef) {
    super(ref);
  }

  act(ev: any) {
    console.warn(11111111111111111,ev);
    this.bubbleAction(ev)
  }
}
