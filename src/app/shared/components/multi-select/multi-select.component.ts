import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output, OnDestroy, AfterViewInit
} from '@angular/core';
import {MatSelect} from '@angular/material/select';
import {of, ReplaySubject, Subject} from 'rxjs';
import {FormControl} from '@angular/forms';
import {takeUntil, take} from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() appearance: string = 'outline';
  selectedItemLength = 0;
  @Input() setDefaultValueSelected: any = [1];



  public entityCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public entityFilterCtrl: FormControl = new FormControl();

  /** list of entities filtered by search keyword */
  public filteredEntities: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  @ViewChild('singleSelect', {static: true}) singleSelect: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  @Input() set data(data: any[]) {
    this._data = data;
    // load the initial entity list
    this.filteredEntities.next(this.data.slice());
  }

  get data(): any[] {
    return this._data;
  }

  private _data: any[];

  @Output() onSelectionChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit(): void {
    this.entityCtrl.setValue(this.setDefaultValueSelected)
    // listen for search field value changes
    this.entityFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterEntities();
      });


  }

  ngAfterViewInit(): void {
    this.setInitialValue();
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  onChange($event) {
    this.selectedItemLength=$event?.value?.length;
    console.log(this.onSelectionChange)
    this.onSelectionChange.emit($event);
  }

  private setInitialValue() {
    this.filteredEntities
      .pipe(
        take(1),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => {
        if (this.singleSelect)
          this.singleSelect.compareWith = (a: any, b: any) => a.value === b.value;
      });
  }

  private filterEntities() {
    if (!this.data) {
      return;
    }
    // get the search keyword
    let search = this.entityFilterCtrl.value;
    if (!search) {
      this.filteredEntities.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the entitys
    this.filteredEntities.next(
      this.data.filter(entity => entity.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
