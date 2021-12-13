import { Component, AfterViewInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistic-chart',
  templateUrl: './statistic-chart.component.html',
  styleUrls: ['./statistic-chart.component.scss']
})
export class StatisticChartComponent implements AfterViewInit {

  canvas: any;
  ctx: any;
  dataArray = [];

  constructor() { }

  @Input() labels: any[];
  
  @Input() set data(val: any) {
    val.forEach( el => {
      let tmpData = {
        label: el.name,
        data: el.data,
        borderColor: el.color,
        fill: false,
        borderWidth: 1
      };
      this.dataArray.push(tmpData);
    });
  }


  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
          labels: this.labels,
          datasets: this.dataArray
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }

}
