import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SatDatepickerModule } from 'saturn-datepicker';
import { DatePipe } from '@angular/common';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { DateRangeState } from 'src/app/store/state';
import { Observable } from 'rxjs';
import { DateRange } from 'src/app/banner-admin/admin-components/model/DateRange';
import { UpdateDateRange } from 'src/app/store/actions';
import { MatCalendar } from '@angular/material';
import { TypesService } from 'src/app/banner-admin/services/types.service';
import { UtilsFunction } from 'src/app/banner-admin/utils-function';
declare var $: any;

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
  providers: [DatePipe]
})
export class FiltersBarComponent implements OnInit {

  @Output() clearSearch = new EventEmitter();
  shipMaxDate = new Date();
  shipMinDate = new Date();
  orderMaxDate = new Date();
  orderMinDate = new Date();
  showCalender = false;
  shipCalender;
  orderCalender;
  statusList = [];
  companiesList = [];
  proofStatusList = [];
  orderInputDate;
  shipInputDate;

  filters = {
    status: '',
    company: '',
    due_date_start: '',
    due_date_end: '',
    order_date_start: '',
    order_date_end: '',
    proof: '',
    job_id: '',
    reference_number: '',
    invoice_no: '',
    job_name: '',
    place_by: '',
  };

  @ViewChild(MatCalendar, { static: false }) _datePicker: MatCalendar<Date>;
  @ViewChild('picker', { static: false }) datePicker: SatDatepickerModule;
  @Select(DateRangeState.getDateRange) dateRange$: Observable<DateRange>;

  constructor(
    private datePipe: DatePipe,
    private apiServeice: ApiService,
    private typeService: TypesService,
    private store: Store,
    private util: UtilsFunction,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['filterObj']) {
          this.filters = JSON.parse(params['filterObj']);
        }
      });
      this.datePickerSelected();
    }

  ngOnInit(): void {
    this.getStatus();
    this.getProofStatus();
    this.getCompanies();
  }

  dueDateChange(event) {
    const start = this.datePipe.transform(event.begin, 'yyyy-MM-dd');
    const end = this.datePipe.transform(event.end, 'yyyy-MM-dd');
    this.filters.due_date_start = start;
    this.filters.due_date_end = end;
    const dRange = new DateRange();
    dRange.due_date_start = start;
    dRange.due_date_end = end;
    this.updateDateRange(dRange);
    this.shipInputDate = this.datePipe.transform(start, 'dd-MM-yyyy') + ' to ' + this.datePipe.transform(end, 'dd-MM-yyyy');
  }

  orderDateChange(event) {
    const start = this.datePipe.transform(event.begin, 'yyyy-MM-dd');
    const end = this.datePipe.transform(event.end, 'yyyy-MM-dd');
    this.filters.order_date_start = start;
    this.filters.order_date_end = end;
    const dRange = new DateRange();
    dRange.order_date_start = start;
    dRange.order_date_end = end;
    this.updateDateRange(dRange);
    this.orderInputDate = this.datePipe.transform(start, 'dd-MM-yyyy') + ' to ' + this.datePipe.transform(end, 'dd-MM-yyyy');
  }

  updateDateRange(dateRange: DateRange) {
    this.store.dispatch(new UpdateDateRange(dateRange));
  }

  datePickerSelected() {
    this.orderInputDate = '';
    this.shipInputDate = '';
    if (this.filters.order_date_start) {
      this.orderInputDate = this.datePipe.transform(this.filters.order_date_start, 'dd-MM-yyyy') + ' to ' +
      this.datePipe.transform(this.filters.order_date_end, 'dd-MM-yyyy');
      this.orderMinDate = new Date(this.filters.order_date_start);
      this.orderMaxDate = new Date(this.filters.order_date_end);
    } else {
      this.filters.order_date_start = this.datePipe.transform(this.util.preMonth, 'yyyy-MM-dd');
      this.filters.order_date_end = this.datePipe.transform(this.util.nextMonth, 'yyyy-MM-dd');
      this.orderInputDate = this.datePipe.transform(this.filters.order_date_start, 'dd-MM-yyyy') + ' to ' +
      this.datePipe.transform(this.filters.order_date_end, 'dd-MM-yyyy');
      this.orderMinDate = new Date(this.filters.order_date_start);
      this.orderMaxDate = new Date(this.filters.order_date_end);
    }
    if (this.filters.due_date_start) {
      this.shipInputDate = this.datePipe.transform(this.filters.due_date_start, 'dd-MM-yyyy') + ' to ' +
      this.datePipe.transform(this.filters.due_date_end, 'dd-MM-yyyy');
      this.shipMinDate = new Date(this.filters.due_date_start);
      this.shipMaxDate = new Date(this.filters.due_date_end);
    } else {
      this.filters.due_date_start = this.datePipe.transform(this.util.preMonth, 'yyyy-MM-dd');
      this.filters.due_date_end = this.datePipe.transform(this.util.nextMonth, 'yyyy-MM-dd');
      this.shipInputDate = this.datePipe.transform(this.filters.due_date_start, 'dd-MM-yyyy') + ' to ' +
      this.datePipe.transform(this.filters.due_date_end, 'dd-MM-yyyy');
      this.orderMinDate = new Date(this.filters.order_date_start);
      this.orderMaxDate = new Date(this.filters.order_date_end);
    }
  }

  dateSelected(type) {
    if (type === 'ship') {
      this.shipCalender = false;
    } else {
      this.orderCalender = false;
    }
  }

  clearDates(value) {
    if (value === 'ship') {
      this.shipInputDate = '';
      this.filters.due_date_end = '';
      this.filters.due_date_start = '';
      this.shipMinDate = null;
      this.shipMaxDate = null;

    } else {
      this.orderInputDate = '';
      this.filters.order_date_end = '';
      this.filters.order_date_start = '';
      this.orderMaxDate = null;
      this.orderMinDate = null;
    }
  }

  applyFilters(value) {
    switch (value) {
      case 'is_missing_deadline':
        this.router.navigate(['/order-status'], { queryParams: { filter: JSON.stringify({'is_missing_deadline': true}) } });
        break;
      case 'due_date_today':
        const today_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.router.navigate(['/order-status'], { queryParams: { filter: JSON.stringify({'due_date_start': today_date}) } });
        break;
      case 'due_date_tomorrow':
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrow_date = this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
          this.router.navigate(['/order-status'], { queryParams: { filter: JSON.stringify({'due_date_end': tomorrow_date}) } });
          break;
      case 'my_jobs':
        this.router.navigate(['/order-status'], { queryParams:
                            { filter: JSON.stringify( {'place_by': localStorage.getItem('username')}) } });
        break;
      case 'all_jobs':
        this.router.navigate(['/order-status'], { queryParams: { filterObj: ''}});
        break;
      default:
        this.router.navigate(['/order-status'], { queryParams: { filterObj: JSON.stringify(this.filters) } });
    }
  }

  clearFilter() {
    this.clearSearch.emit(true);
    this.router.navigate(['/order-status'], { queryParams: { filterObj: ''}});
  }

  getStatus() {
    this.typeService.getStatus().subscribe(res => {
      this.statusList = res.types;
    });
  }

  openOrderOnly(event) {
    this.router.navigate(['/order-status'], { queryParams: { filter: JSON.stringify({'is_open': event.target.checked}) } });
  }

  getCompanies() {
    this.typeService.getCompanies().subscribe(res => {
      this.companiesList = res.names;
    });
  }

  getProofStatus() {
    this.typeService.getProofStatus().subscribe(res => {
      this.proofStatusList = res.types;
    });
  }

}
