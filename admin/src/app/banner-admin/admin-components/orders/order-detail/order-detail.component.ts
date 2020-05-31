import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  orderId: number;
  orderDetail = [];
  orderOption = [];
  notRecordFound = false;
  loader = true;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.orderId = params['id'];
        this.getOrderDetail(this.orderId);
      }
    });
  }

  getOrderDetail(id) {
    this.loader = true;
    this.orderService.getOrderDetail(id).subscribe(res => {
        this.orderDetail = res;
        this.orderOption = res.order_options;
        this.loader = false;
    });
  }

}
