import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrderService } from 'src/app/banner-admin/services/order.service';
import { CustomOrderList } from '../../model/custom-order';
import { CustomerList } from '../../model/customer-list';
import { UserList } from '../../model/user';

@Component({
  selector: 'app-cart-work-order',
  templateUrl: './cart-work-order.component.html',
  styleUrls: ['./cart-work-order.component.scss'],
  providers: [DatePipe]
})
export class CartWorkOrderComponent implements OnInit {

  orderList: CustomOrderList;
  customerList: CustomerList;
  userList: UserList;
  productDetail = [];
  orderOptions = [];
  proofApprovedDate;
  orderDateTime;
  loader = true;
  cartOrder = false;
  workOrder;
  window;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private datePipe: DatePipe
    ) {
      this.window = window;
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getCartOrderById(params['id']);
      }
    });
  }


  getCartOrderById(id) {
    this.loader = true;
    this.orderService.getCartOrderById(id).subscribe(res => {
      this.orderList = res;
      this.workOrder = 'C' + this.orderList.id;
      this.orderDateTime = this.datePipe.transform(this.orderList.due_date, 'M/d/yy, h:mm:ss a');
      this.customerList = this.orderList.customer ? this.orderList.customer : null ;
      this.userList = this.customerList ? this.customerList.user : null;
      this.productDetail = this.orderList.product;
      this.orderOptions = this.orderList.order_options;
      this.loader = false;
    });
  }
}
