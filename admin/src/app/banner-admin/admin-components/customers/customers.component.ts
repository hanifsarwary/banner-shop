import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerList } from '../model/customer-list';
import { UserList } from '../model/user';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customerForm: FormGroup;
  validateFlag = false;
  submitted = false;
  usernameError = false;
  statusList = [];
  updateList = [];
  customerList: CustomerList;
  customerId;
  userList: UserList;
  operation = 'Add';
  opeFlag = false;
  passwordFlag = false;
  loader = false;


  constructor(private fb: FormBuilder,
    private orderServeice: OrderService,
    private route: ActivatedRoute,
    private toast: ToastrService) {

    this.customerForm = this.fb.group({
      user: this.fb.group({
        username: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.compose([Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.required]
      }),
      status: [],
      company_name: [''],
      resale_no: [''],
      address: [''],
      city: [''],
      zip_code: [''],
      country: ['USA'],
      phone_number: ['', [Validators.minLength(8),
        Validators.maxLength(20), Validators.pattern('^[+0-9][-(-)0-9.]*$')]],
      fax_number: [''],
      second_email: ['', Validators.compose([
                         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      third_email: ['', Validators.compose([
                        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      bussiness_type: [''],
    });
   }

  ngOnInit(): void {
    this.getStatus();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.operation = params['operation'];
        this.opeFlag = this.operation === 'Update' ? false : true;
        this.customerId = params['id'];
        this.getCustomerById(params['id']);
      } else {
        this.loader = false;
      }
    });
  }

  getCustomerById(id) {
    this.loader = true;
    this.orderServeice.getCustomers(id).subscribe(res => {
      this.customerList = res;
      this.userList = this.customerList.user;
      this.loader = false;
    });
  }

  getStatus() {
    this.orderServeice.getStatus().subscribe(res => {
      this.statusList = res.types;
    });
  }

  onSubmit(obj) {
    if (this.operation === 'Add') {
      this.submitted = true;
      if (this.customerForm.valid) {
        this.validateFlag = false;
        this.submitted = false;
        this.orderServeice.addCustomers(obj.value).subscribe(res => {
          this.toast.success('Customer added successfully!', '');
        }, err => {
          this.usernameError = true;
        });
      } else {
        this.validateFlag = true;
      }
    } else {
      this.updateList = obj.value;
      delete this.updateList['user']['username'];
      delete this.updateList['user']['password'];
      this.orderServeice.updateCustomer(this.customerId, obj.value).subscribe(res => {
        this.toast.success('Customer updated successfully!', '');
      });
    }
  }
}
