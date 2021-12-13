import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {

  constructor() {}

  @Input() title:   any;
  @Input() content: any;
  @Input() icon:    any;
  @Input() type:    any;

  ngOnInit() {}

  get backgroundColor() {
    return `bg-${this.type}`;
  }

}
