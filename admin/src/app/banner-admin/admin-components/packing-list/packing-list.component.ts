import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerList } from '../model/customer-list';
import { UserList } from '../model/user';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent implements OnInit {

  packingListFrom: FormGroup;
  customOrderId;
  customOrderList;
  customerList: CustomerList;
  userList: UserList;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toast: ToastrService
    ) {
    this.packingListFrom = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      company_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      zip_code: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      due_date: ['', Validators.required],
      comment: ['', Validators.required],
      received_by: ['', Validators.required],
      boxes: this.fb.group({
        number_of_boxes: ['', Validators.required],
        quantity_per_box: ['', Validators.required],
      }),
      custom_order: ''
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.customOrderId = params['id'];
      }
    });
    this.route.queryParams.subscribe(params => {
      if (params['obj']) {
        this.customOrderList = JSON.parse(params['obj']);
        this.customerList = this.customOrderList.customer;
      }
    });
  }

  onSubmit(obj) {
    obj.value.custom_order = this.customOrderId;
    this.orderService.addPackingList(this.customOrderId, obj.value).subscribe(res => {
      this.toast.success('Packing List Created successfully!', '');
    });
  }

}
