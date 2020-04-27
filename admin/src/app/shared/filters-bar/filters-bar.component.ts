import { Component, OnInit, ViewChild } from '@angular/core';
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
declare var $: any;

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
  providers: [DatePipe]
})
export class FiltersBarComponent implements OnInit {

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

  constructor(private datePipe: DatePipe,
    private apiServeice: ApiService,
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
      this.activatedRoute.queryParams.subscribe(params => {
        if (params['filterObj']) {
          this.filters = JSON.parse(params['filterObj']);
          const dueDates = {
            start: this.filters.due_date_start,
            end: this.filters.due_date_end
          };
        } else {
          this.filters = this.filters;
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
    this.shipInputDate = start + ' to ' + end;
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
    this.orderInputDate = start + ' to ' + end;
  }

  updateDateRange(dateRange: DateRange) {
    this.store.dispatch(new UpdateDateRange(dateRange));
  }

  datePickerSelected() {
    this.orderInputDate = '';
    this.shipInputDate = '';
    if (this.filters.order_date_start) {
      this.orderInputDate = this.filters.order_date_start + ' to ' + this.filters.order_date_end;
      this.orderMinDate = new Date(this.filters.order_date_start);
      this.orderMaxDate = new Date(this.filters.order_date_end);
    }
    if (this.filters.due_date_start) {
      this.shipInputDate = this.filters.due_date_start + ' to ' + this.filters.due_date_end;
      this.shipMinDate = new Date(this.filters.due_date_start);
      this.shipMaxDate = new Date(this.filters.due_date_end);
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

  applyFilters() {
    this.router.navigate(['/order-status'], { queryParams: { filterObj: JSON.stringify(this.filters) } });
  }

  getStatus() {
    this.apiServeice.getStatus().subscribe(res => {
      this.statusList = res.types;
    });
  }

  getCompanies() {
    this.apiServeice.getCompanies().subscribe(res => {
      this.companiesList = res.names;
    });
  }

  getProofStatus() {
    this.apiServeice.getProofStatus().subscribe(res => {
      this.proofStatusList = res.types;
    });
  }

}
