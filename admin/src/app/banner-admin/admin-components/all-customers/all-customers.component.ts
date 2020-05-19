import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.css']
})
export class AllCustomersComponent implements OnInit {
  tableColumns = ['no', 'username', 'first_name', 'last_name', 'email', 'address', 'company_name', 'city', 'phone_number', 'status', 'edit-customer'];
  customerList = [];
  notRecordFound = false;
  loader = true;

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  gotoCustomer() {
    this.router.navigate(['add-customer']);
  }

  showByStatus(value) {
    const param = `?status=${value}`;
    if (value === 'all') {
      this.getAllCustomers();
    } else {
      this.getAllCustomers(param);
    }
  }

  getAllCustomers(param?) {
    this.loader = true;
    this.customerList = [];
    this.orderService.getCustomers(param).subscribe(res => {
      if (res.results.length) {
        this.customerList = res.results;
        this.loader = false;
      } else {
        this.loader = false;
        this.notRecordFound = true;
      }
    });
  }

}
