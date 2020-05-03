import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { DatePipe } from '@angular/common';
import { UtilsFunction } from '../../utils-function';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  providers: [DatePipe]
})
export class OrderStatusComponent implements OnInit {

  tableColumns = ['no', 'work_order', 'invoice_no', 'po_ref_no', 'job_name', 'product_info',
  'submitted_date', 'due_date', 'job_status', 'actual_ship_date', 'company', 'proof_status',
  'quoted_price', 'final_size', 'placed_by', 'work_by', 'create_packing_list', 'send_email', 'edit_order'];

  customOrderList = [];
  filters = {};
  loader = true;
  search_info;

  constructor(
    private orderServeice: OrderService,
    private datePipe: DatePipe,
    private util: UtilsFunction,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['filterObj']) {
        this.filters = JSON.parse(params['filterObj']);
        this.getCustomOrder();
      } else if (params['filter']) {
        this.filters = {};
        this.filters = JSON.parse(params['filter']);
        this.getCustomOrder();
      } else {
        this.filters = {};
        this.filters['due_date_start'] = this.datePipe.transform(this.util.preMonth, 'yyyy-MM-dd');
        this.filters['due_date_end'] = this.datePipe.transform(this.util.nextMonth, 'yyyy-MM-dd');
        this.filters['order_date_start'] = this.datePipe.transform(this.util.preMonth, 'yyyy-MM-dd');
        this.filters['order_date_end'] = this.datePipe.transform(this.util.nextMonth, 'yyyy-MM-dd');
        this.getCustomOrder();
      }
    });
  }

  searchItem() {
    const params = this.search_info ? { 'search_info' : this.search_info } : '';
    this.getCustomOrder(params);
  }

  getCustomOrder(params?) {
    this.loader = true;
    this.customOrderList = [];
    if (params) {
      this.orderServeice.getCustomOrder(params).subscribe(res => {
        this.customOrderList = res.results;
        this.loader = false;
      });
    } else {
      this.orderServeice.getCustomOrder(this.filters).subscribe(res => {
        this.customOrderList = res.results;
        this.loader = false;
      });
    }
  }

}
