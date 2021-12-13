import { Component, OnInit } from '@angular/core';
import appData from 'src/app/Services/Data/AppData';

@Component({
  selector: 'app-universal-view',
  templateUrl: './universal-view.component.html',
  styleUrls: ['./universal-view.component.scss']
})
export class UniversalViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public get view() {
    return appData.data.view;
  }

}
