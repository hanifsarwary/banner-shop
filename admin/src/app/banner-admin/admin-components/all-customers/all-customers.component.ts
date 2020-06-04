import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-all-customers',
  templateUrl: './all-customers.component.html',
  styleUrls: ['./all-customers.component.scss']
})
export class AllCustomersComponent implements OnInit {
  tableColumns = ['no', 'username', 'first_name', 'last_name', 'email', 'address', 'company_name', 'city', 'phone_number', 'status', 'edit-customer'];
  customerList = [];
  notRecordFound = false;
  loader = true;
  search_info;
  filterObj = {
    order_by: ''
  };
  filters = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    comapany_name: '',
    city: '',
    status: 1
  };

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers(this.filters);
  }

  gotoCustomer() {
    this.router.navigate(['add-customer']);
  }

  sortColumn(orderBy, filterObj) {
    const orderByStr = String(filterObj['order_by']);
    if (filterObj['order_by'] === orderBy) {
        if (orderByStr.startsWith('-')) {
            return orderBy;
        } else {
            return '-' + orderBy;
        }
    } else {
        return orderBy;
    }
  }

  sortingOnColumn(event) {
    this.filterObj.order_by = this.sortColumn(event, this.filterObj);
    this.getAllCustomers(this.filterObj);
  }

  applyFilters() {
    this.getAllCustomers(this.filters);
  }

  getAllCustomers(obj) {
    this.loader = true;
    this.customerList = [];
    this.orderService.getAllCustomers(obj).subscribe(res => {
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
