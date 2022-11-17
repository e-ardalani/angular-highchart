import {Component, Input, OnInit} from '@angular/core';
import Highcharts from 'highcharts';
import GroupedCategories from 'highcharts-grouped-categories/grouped-categories';

GroupedCategories(Highcharts);

@Component({
  selector: 'app-high-chart',
  templateUrl: './high-chart.component.html',
  styleUrls: ['./high-chart.component.scss']
})
export class HighChartComponent implements OnInit {
  _config;

  @Input() set config(value) {
    this._config = value;
  };

  _data;

  @Input() set data(value) {
    this._data = value;
    const dataFirst = this._data[0].data.map(item => item.value);
    this.linechart.series[0].data = dataFirst;
    const dataSecond = this._data[1].data.filter(item => item.name === 'ارفع').map(item => (item.value) * 100);
    const dataThird = this._data[1].data.filter(item => item.name === 'اخابر').map(item => (item.value) * 100);
    this.linechart.series[1].data = dataSecond;
    this.linechart.series[2].data = dataThird;
    console.log(this.linechart)

    this.linechart = JSON.parse(JSON.stringify(this.linechart))
  }

  Highcharts = Highcharts;
  // linechart;
  linechart = {
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


  ngOnInit(): void {
    // this.linechart = this._config;
    const dataFirst = this._data[0].data.map(item => item.value);
    this.linechart.series[0].data = dataFirst;

    const dataSecond = this._data[1].data.filter(item => item.name === 'ارفع').map(item => (item.value) * 100);
    const dataThird = this._data[1].data.filter(item => item.name === 'اخابر').map(item => (item.value) * 100);
    this.linechart.series[1].data = dataSecond;
    this.linechart.series[2].data = dataThird;
  }
}
