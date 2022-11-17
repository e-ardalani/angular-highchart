import {
    Component, ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    FormControl,
    NG_VALUE_ACCESSOR,
    NgControl,
    ValidationErrors
} from '@angular/forms';
import {MatDatepicker, MatDatepickerIntl} from '@angular/material/datepicker';
import moment from 'jalali-moment';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {FloatLabelType} from '@angular/material/form-field';


export const USER_PROFILE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateComponent),
    multi: true
};

@Component({
    selector: 'app-date',
    templateUrl: './date.component.html',
    styleUrls: ['./date.component.scss'],
    providers: [USER_PROFILE_VALUE_ACCESSOR]
})
export class DateComponent implements OnInit, ControlValueAccessor, OnDestroy {

    _control: NgControl;
    @Input() formControl: FormControl = new FormControl();
    @Input() max;
    @Input() min;
    @Input() dateValue;
    @Input() required = false;
    @Input() disabled = false;
    @Input() placeholder: string;
    @Input() readonly: boolean;
    @Input() inGrid: boolean;
    @Input() tabIndex: number;
    @Output() changed = new EventEmitter();
    @Input() floatLabel: FloatLabelType = 'auto';
    @Input() bgColor = 'transparent';
    @Input() hourNumber: number;
    onChange: (value: any) => {};
    dateInputChange: Subject<string> = new Subject();
    private subscription = new Subscription();
    @ViewChild('picker', {static: true}) picker: MatDatepicker<any>;
    @ViewChild('datepickerFooter', {static: false}) datepickerFooter: ElementRef;

    value: any = undefined;
    readonly kabise = [4, 37, 66, 99, 132, 165, 198, 231, 264, 297, 326
        , 359, 392, 425, 458, 491, 524, 553, 586, 619, 656, 685, 718, 751, 784, 817
        , 850, 883, 916, 949, 978, 1011, 1044, 1077, 1110, 1143, 1176, 1209, 1238
        , 1275, 1308, 1343, 1370, 1401, 1436, 1473, 1502];

    constructor(private injector: Injector) {
        this.subscription.add(this.dateInputChange.pipe(debounceTime(1000)).subscribe(str => {
            this.updateDate(str);
        }));
    }

    get errors(): ValidationErrors {
        let e = document.getElementById('matInput');
        const hasErrors = this._control.control && this._control.control && this._control.control.errors &&
            (this._control.control.touched || this._control.control.dirty);

        return hasErrors
            ? this._control.control.errors
            : null;
    }

    /**
     * Write form value to the DOM element (model => view)
     */
    writeValue(value: any): void {
        if (value) {
            this.value = moment(new Date(value));
        } else {
            this.value = null;
        }

    }

    deletValue() {
        this.value = null;
        this.onChange(this.value);
        this.writeValue(this.value);
    }

    /**
     * Write form disabled state to the DOM element (model => view)
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onClear(): void {
        this.value = null;
        this.onChange && this.onChange(this.value);
        this.changed.emit(this.value)
    }

    deletDate() {

    }

    onOpen() {
        this.appendFooter();
    }

    getPannelClass() {
        return (this.min && this.max) ? 'has-range' : 'pannelClass';
    }

    private appendFooter() {
        const matCalendar = document.getElementsByClassName('mat-datepicker-content')[0] as HTMLElement;
        matCalendar.appendChild(this.datepickerFooter.nativeElement);
    }

    /**
     * Update form when DOM element value changes (view => model)
     */
    registerOnChange(fn: any): void {
        // Store the provided function as an internal method.
        this.onChange = fn;
    }

    /**
     * Update form when DOM element is blurred (view => model)
     */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    onTouched() {
    }

    ngOnInit(): void {
        this._control = this.injector.get(NgControl);


    }

    onValueChange(data: any) {
        this.value = data.target.value;
        if (!this.value) {
            this.onClear();
            this._control.control.setErrors({'date': true});
            this._control.control.markAsTouched();
        } else {
            this.onChange && this.onChange(data.target.value.valueOf());
            this.changed.emit(data.target.value.valueOf())
        }
    }

    onKeyDown(e): void {
        const regexp = new RegExp('[\u06F0-\u06F90-9-/]');
        if (e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && !e.ctrlKey && !regexp.test(e.key) && e.key !== 'Tab') {
            e.preventDefault();
        }
        // e.preventDefault();
        // this.toastr.warning('تاریخ را انتخاب کنید');

        // const regexp = new RegExp('[\u06F0-\u06F90-9-/]');
        // if (e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && !e.ctrlKey && !regexp.test(e.key) && e.key !== 'Tab') {
        //     e.preventDefault();
        // }
    }

    kabiseShamsi(sal: number): boolean {
        let k = 0;
        for (let i = 0; i <= sal; i += 4) {
            if (i > this.kabise[k]) {
                i++;
                k++;
            }
            if (sal === i) {
                return true;
            }
        }
        return false;
    }

    private updateDate(str: string): void {
        if (str.length === 0) {
            this.onClear();
            return;
        }
        const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
        const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
        let dateString = str;
        for (let i = 0; i <= 9; i++) {
            dateString = dateString.replace(persianNumbers[i], String(i)).replace(arabicNumbers[i], String(i));
        }
        if (this.isValidDateString(dateString)) {
            this.value = moment.from(dateString, 'fa').toDate();
            this.onChange && this.onChange(this.value.getTime());
            this.changed.emit(this.value.getTime())
        }
    }

    private isValidDateString(dt: string): boolean {
        const splited = dt.split('/').map(numStr => +numStr);
        const monthDays = [
            31, 31, 31, 31, 31, 31,
            30, 30, 30, 30, 30, this.kabiseShamsi(splited[0]) ? 30 : 29
        ];
        if (splited.length < 3) {
            return false;
        }

        if (splited[0] < 1200 || splited[1] < 1 || splited[2] < 1) {
            return false;
        }

        if (splited[0] > 1500) {
            return false;
        }

        if (splited[1] > 12) {
            return false;
        }

        if (splited[2] > monthDays[splited[1] - 1]) {
            return false;
        }

        return true;
    }

    dateChange(e): void {
        this.updateDate(e.target.value);
    }

    dateInput(e) {
        this.dateInputChange.next(e.target.value);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    isRequired(): boolean {
        return this._control.control && this._control.control.validator &&
            (this._control.control.validator({} as AbstractControl)) &&
            (this._control.control.validator({} as AbstractControl)).required;
    }

    setTodayDate() {
        this.value = moment(new Date());
        this.onChange(this.value.valueOf());

        this.picker.close();
        setTimeout(() => {
            this.picker.open();
        }, 0);
    }

}
