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
import { MultiSelectComponent } from './shared/components/multi-select/multi-select.component';
import {NgxMatSelectSearchModule} from 'ngx-mat-select-search';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {HighchartsChartModule} from 'highcharts-angular';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Chart1Component,
    Chart2Component,
    ChartsComponent,
    HighChartComponent,
    MultiSelectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    DatePickerModule,
    NgxMatSelectSearchModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatChipsModule,
    HighchartsChartModule,



  ],
  exports: [MaterialModule,MatIconModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
