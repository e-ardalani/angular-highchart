import { Component, OnInit } from '@angular/core';
import {SelectData} from '@app/pages/mock-data/selectData';
import {Data1} from '@app/pages/mock-data/chart1Data';
import {Data2} from '@app/pages/mock-data/chart2Data';

@Component({
  selector: 'app-chart2',
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.scss']
})
export class Chart2Component implements OnInit {

  selectData = SelectData;
  chartData1 = Data1;
  chartData2 = Data2;
  chartData = [];

  constructor() {
  }

  ngOnInit() {
    this.chartData = this.chartData1;
  }

  getData(event) {
    if (event?.value?.length > 1) {
      this.chartData = this.chartData2;
    } else {
      this.chartData = this.chartData1;
    }
  }

}
