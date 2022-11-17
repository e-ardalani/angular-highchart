import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DateComponent} from '@app/shared/components/date/component/date.component';
import {MaterialPersianDateAdapter, PERSIAN_DATE_FORMATS1} from '@app/shared/components/date/material.persian-date.adapter';

@NgModule({
    declarations: [
        DateComponent
    ],
    exports: [
        DateComponent
    ],
    imports: [
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [
        {provide: DateAdapter, useClass: MaterialPersianDateAdapter, deps: [MAT_DATE_LOCALE]},
        {provide: MAT_DATE_FORMATS, useValue: PERSIAN_DATE_FORMATS1}
    ]
})
export class DateModule {
}
