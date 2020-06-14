import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CustomOrderList } from '../model/custom-order';
import { CustomerList } from '../model/customer-list';
import { UserList } from '../model/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss'],
  providers: [DatePipe]
})
export class WorkOrderComponent implements OnInit {

  orderList: CustomOrderList;
  customerList: CustomerList;
  userList: UserList;
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
        if (this.router.url.includes('cart-work-order')) {
          this.cartOrder = true;
          this.getCartOrderById(params['id']);
        } else {
          this.getCustomOrderById(params['id']);
          this.getProofApprovedDate(params['id']);
        }
      }
    });
  }

  getProofApprovedDate(id) {
    this.orderService.getProofApprovedDate(id).subscribe(res => {
      this.proofApprovedDate = res.result_date;
    });
  }

  getCartOrderById(id) {
    this.orderService.getCartOrderById(id).subscribe(res => {
      this.orderList = res;
      this.workOrder = 'C' + this.orderList.id;
      this.orderDateTime = this.datePipe.transform(this.orderList.due_date, 'M/d/yy, h:mm:ss a');
      this.customerList = this.orderList.customer;
      this.userList = this.customerList.user;
      this.loader = false;
    });
  }

  getCustomOrderById(id) {
    this.loader = true;
    this.orderService.getCustomOrderById(id).subscribe(res => {
      this.orderList = res;
      this.workOrder = this.orderList.id;
      this.orderDateTime = this.datePipe.transform(this.orderList.created_at, 'M/d/yy, h:mm:ss a');
      this.customerList = this.orderList.customer;
      this.userList = this.customerList.user;
      this.loader = false;
    });
  }

}
