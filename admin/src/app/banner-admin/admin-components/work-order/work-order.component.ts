import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CustomOrderList } from '../model/custom-order';
import { CustomerList } from '../model/customer-list';
import { UserList } from '../model/user';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss']
})
export class WorkOrderComponent implements OnInit {

  orderList: CustomOrderList;
  customerList: CustomerList;
  userList: UserList;
  proofApprovedDate;
  loader = true;
  window;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) {
      this.window = window;
    }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.getCustomOrderById(params['id']);
        this.getProofApprovedDate(params['id']);
      }
    });
  }

  getProofApprovedDate(id) {
    this.orderService.getProofApprovedDate(id).subscribe(res => {
      this.proofApprovedDate = res.result_date;
    });
  }

  getCustomOrderById(id) {
    this.loader = true;
    this.orderService.getCustomOrderById(id).subscribe(res => {
      this.orderList = res;
      this.customerList = this.orderList.customer;
      this.userList = this.customerList.user;
      this.loader = false;
    });
  }

}
