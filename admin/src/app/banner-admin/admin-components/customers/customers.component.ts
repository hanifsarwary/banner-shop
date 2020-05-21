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


  constructor(private fb: FormBuilder,
    private orderServeice: OrderService,
    private route: ActivatedRoute,
    private toast: ToastrService) {

    this.customerForm = this.fb.group({
      approach_details: [''],
      bussiness_type: [''],
      address: ['', Validators.required],
      city: ['', Validators.required],
      company_name: ['', Validators.required],
      status: ['', Validators.required],
      resale_no: ['', Validators.required],
      country: ['USA', Validators.required],
      fax_number: [''],
      phone_number: ['', [Validators.required, Validators.minLength(8),
                          Validators.maxLength(20), Validators.pattern('^[+0-9][-(-)0-9.]*$')]],
      zip_code: ['', Validators.required],
      second_email: ['', Validators.compose([
                         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      third_email: ['', Validators.compose([
                        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      user: this.fb.group({
        username: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.compose([Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.required]
      })
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
      }
    });
  }

  getCustomerById(id) {
    this.orderServeice.getCustomers(id).subscribe(res => {
      this.customerList = res;
      this.userList = this.customerList.user;
    });
  }

  getStatus() {
    this.orderServeice.getStatus().subscribe(res => {
      this.statusList = res.types;
    });
  }

  onSubmit(obj) {
    this.submitted = true;
    if (this.operation === 'Add') {
      if (this.customerForm.valid) {
        this.validateFlag = false;
        this.submitted = false;
        this.orderServeice.addCustomers(obj.value).subscribe(res => {
          this.toast.success('Customer added successfully!', '');
          this.customerForm.reset();
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
