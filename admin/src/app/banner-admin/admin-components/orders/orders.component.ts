import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  tableColumns = ['no', 'user_name', 'user_email', 'order_product_name', 'customer_company', 'job_status', 'order_operetion'];
  orderList = [];
  notRecordFound = false;
  loader = true;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.loader = true;
    this.orderList = [];
    this.orderService.getAllOrder().subscribe(res => {
      if (res.results.length) {
        this.orderList = res.results;
        this.loader = false;
      } else {
        this.loader = false;
        this.notRecordFound = true;
      }
    });
  }

}
