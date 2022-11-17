import {Component, Input, OnInit} from '@angular/core';
import Highcharts, {Options} from 'highcharts';
import GroupedCategories from 'highcharts-grouped-categories/grouped-categories';

GroupedCategories(Highcharts);

@Component({
  selector: 'app-high-chart',
  templateUrl: './high-chart.component.html',
  styleUrls: ['./high-chart.component.scss']
})
export class HighChartComponent {
  options: Options = {
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
    series: [],
    chart: {},
    title: {
      text: '',
    },
    xAxis: [{
      categories: [],
    }],
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
        format: `{value}`,
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
  updateFlag = false;
  oneToOne = true;
  chart = Highcharts;

  @Input() set data(value) {
    if (value.length === 0)
      return;
    const xAxisArr = [];
    const series = [];

    const groupByDate = this.groupBy(value[0].data, 'date');
    const incomeAxis = {categories: []};
    const profitAxis = {categories: [], visible: false};
    xAxisArr.push(incomeAxis);
    xAxisArr.push(profitAxis);

    Object.keys(groupByDate).forEach(key => {
      const category = {
        name: key,
        style: {
          fontFamily: 'Yekan'
        },
        categories: []
      };
      groupByDate[key].forEach(val => {
        category.categories.push({
          name: val.name
        });
      });
      incomeAxis.categories.push(category);
      profitAxis.categories.push({
        name: key,
        style: {
          fontFamily: 'Yekan'
        },
        categories: []
      });
    });
    const incomeValues = value[0].data.map(item => item.value)
    const incomeSerie = {
      type: 'column',
      name: value[0].name,
      yAxis: 0,
      xAxis: 0,
      data: incomeValues,
      style: {
        fontFamily: 'Yekan'
      },
    };
    series.push(incomeSerie);
    const groupByName = this.groupBy(value[1].data, 'name')
    Object.keys(groupByName).forEach(key => {
      const data2 = groupByName[key].map(item => (item.value) * 100)
      const serie = {
        type: 'spline',
        name: value[1].name + ' ' + key,
        yAxis: 1,
        xAxis: 1,
        data: data2,
        style: {
          fontFamily: 'Yekan'
        },
      };
      series.push(serie);
    });


    this.updateChart(xAxisArr, series);
  }

  groupBy(xs, key) {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  }

  updateChart(xAxisArr, ser) {
    this.options.series = ser;
    this.options.xAxis = xAxisArr;
    this.updateFlag = true;
  }


}
