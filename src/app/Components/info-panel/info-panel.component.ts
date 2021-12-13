import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  constructor() { }

  name: string;
  expireDate: string;
  daysRemaining: number;
  percentage: number;

  @Input() set item( val: any) {
    this.name = val.name;
    this.expireDate = val.expireDate;
    this.daysRemaining = val.daysRemaining;
    this.percentage =  Math.round(100 - (( val.daysRemaining / val.totalDays ) * 100));
  }

  get status() {
    if ( this.percentage < 30 ) {
      return 'bg-success';
    } else if ( this.percentage > 30 && this.percentage < 50 ) {
      return 'bg-primary';
    } else  if (this.percentage > 50 && this.percentage < 70 ) {
      return 'bg-warning';
    } else {
      return 'bg-danger';
    }
  }

  ngOnInit() { }

}
