import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './layout/navbar/navbar.component';
import {MaterialModule} from './shared/modules/material.module';
import {Chart1Component} from './pages/chart1/chart1.component';
import {Chart2Component} from './pages/chart2/chart2.component';
import {ChartsComponent} from './pages/charts/charts.component';
import {HighChartComponent} from './shared/components/high-chart/high-chart.component';
import {DatePickerModule} from './shared/components/date-picker/date-picker.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Chart1Component,
    Chart2Component,
    ChartsComponent,
    HighChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    DatePickerModule,

  ],
  exports: [MaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
