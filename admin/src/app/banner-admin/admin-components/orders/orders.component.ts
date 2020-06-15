import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { DatePipe } from '@angular/common';
import { UtilsFunction } from '../../utils-function';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [DatePipe]
})
export class OrdersComponent implements OnInit {
  tableColumns = ['no',  'order_code', 'order_invoice_no', 'po_ref_no', 'job_name', 'order_product_name',
  'submitted_date', 'due_date', 'order_job_status', 'actual_ship_date', 'customer_company', 'order_proof_status',
  'quoted_price', 'order_operetion'];

  orderList = [];
  notRecordFound = false;
  filters = {};
  loader = true;
  search_info;

  constructor(
    private router: Router,
    private datePipe: DatePipe,
    private util: UtilsFunction,
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['filterObj']) {
        this.filters = JSON.parse(params['filterObj']);
        this.getAllOrders();
      } else if (params['filter']) {
        this.filters = {};
        this.filters = JSON.parse(params['filter']);
        this.getAllOrders();
      } else {
        this.filters = {};
        this.filters['due_date_start'] = this.datePipe.transform(this.util.preMonth, 'yyyy-MM-dd');
        this.filters['due_date_end'] = this.datePipe.transform(this.util.nextMonth, 'yyyy-MM-dd');
        this.filters['order_date_start'] = this.datePipe.transform(this.util.preMonth, 'yyyy-MM-dd');
        this.filters['order_date_end'] = this.datePipe.transform(this.util.nextMonth, 'yyyy-MM-dd');
        this.getAllOrders();
      }
    });
  }

  searchItem() {
    const params = this.search_info ? { 'search_info' : this.search_info } : '';
    this.getAllOrders(params);
  }

  getAllOrders(params?) {
    this.loader = true;
    this.orderList = [];
    if (params) {
      this.orderService.getAllOrder(params).subscribe(res => {
        if (res.results.length) {
          this.orderList = res.results;
          this.loader = false;
        } else {
          this.loader = false;
          this.notRecordFound = true;
        }
      });
    } else {
      this.filters['is_cart'] = false;
      this.orderService.getAllOrder(this.filters).subscribe(res => {
        this.orderList = res.results;
        this.loader = false;
      });
    }
  }

  clearSearch(event) {
    this.search_info = '';
  }

}
