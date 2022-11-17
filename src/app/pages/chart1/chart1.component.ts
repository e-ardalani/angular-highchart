import {Component, OnInit} from '@angular/core';
import {SelectData} from '@app/pages/mock-data/selectData';
import {Data1} from '@app/pages/mock-data/chart1Data';
import {Data2} from '@app/pages/mock-data/chart2Data';


@Component({
  selector: 'app-chart1',
  templateUrl: './chart1.component.html',
  styleUrls: ['./chart1.component.scss']
})
export class Chart1Component implements OnInit {
  selectData = SelectData;
  chartData1 = Data1;
  chartData2 = Data2;
  chartData = [];
  chartOption = {
    style: {
      fontFamily: 'Yekan'
    },
    tooltip: {
      style: {
        fontFamily: 'Yekan'
      },
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    series: [{
      type: 'column',
      name: 'درآمد عملیاتی',
      yAxis: 0,
      data: [3, 2, 1, 3, 4, 3, 2, 1, 3, 4, 12],
      style: {
        fontFamily: 'Yekan'
      },
    }, {
      type: 'spline',
      name: 'حاشیه سود عملیاتی - ارفع',
      yAxis: 1,
      data: [2, 3, 5, 7, 6, 2, 3, 5, 7, 6, 12],
      style: {
        fontFamily: 'Yekan'
      },
    },
      {
        type: 'spline',
        name: 'حاشیه سود عملیاتی - اخابر',
        yAxis: 1,
        data: [3, 2.67, 3, 6.33, 3.33, 3, 2.67, 3, 6.33, 3.33, 7],
        style: {
          fontFamily: 'Yekan'
        },
      }],
    chart: {},
    title: {
      text: '',
    },
    xAxis: {
      categories: [
        {
          name: '1395 Q4',
          style: {
            fontFamily: 'Yekan'
          },
          categories: [
            {
              name: 'ارفع',
            },
            {
              name: 'اخابر',
            }
          ]
        },
        {
          name: '1396 Q4',
          style: {
            fontFamily: 'Yekan'
          },
          categories: [
            {
              name: 'ارفع',
            },
            {
              name: 'اخابر',
            }
          ]
        },
        {
          name: '1397 Q4',
          style: {
            fontFamily: 'Yekan'
          },
          categories: [
            {
              name: 'ارفع',
            },
            {
              name: 'اخابر',
            }
          ]
        },
        {
          name: '1398 Q4',
          style: {
            fontFamily: 'Yekan'
          },
          categories: [
            {
              name: 'ارفع',
            },
            {
              name: 'اخابر',
            }
          ]
        },
        {
          name: '1399 Q4',
          style: {
            fontFamily: 'Yekan'
          },
          categories: [
            {
              name: 'ارفع',
            },
            {
              name: 'اخابر',
            }
          ]
        },
        {
          name: '1400 Q4',
          style: {
            fontFamily: 'Yekan'
          },
          categories: [
            {
              name: 'ارفع',
            },
            {
              name: 'اخابر',
            }
          ]
        }
      ]
    },
    yAxis: [{
      title: {
        text: 'م ریال',
        style: {
          fontFamily: 'Yekan'
        },
      },
      labels: {
        style: {
          fontFamily: 'Yekan'
        },
        useHTML: true,
        text: '<p>{{value}} M</p>'
      }
    },
      {
        title: {
          text: 'درصد',
          style: {
            fontFamily: 'Yekan'
          },
        },
        minPadding: 0,
        maxPadding: 0,
        max: 150,
        min: -10,
        opposite: true,
        labels: {
          format: '{value}%',
          style: {
            fontFamily: 'Yekan'
          },
        }
      }],
  };


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
