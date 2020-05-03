import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerList } from '../model/customer-list';
import { UserList } from '../model/user';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { CustomOrderList } from '../model/custom-order';
import { BoxList } from '../model/boxsList';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss'],
  providers: [DatePipe]
})
export class PackingListComponent implements OnInit {

  packingListFrom: FormGroup;
  customOrderId;
  customOrderList: CustomOrderList;
  customerList: CustomerList;
  userList: UserList;
  newBox: any = {};
  submitted = false;
  validateFlag = false;
  dynamicBoxes: Array<BoxList> = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toast: ToastrService,
    private router: Router,
    private datePipe: DatePipe
    ) {
    this.packingListFrom = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      company_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      zip_code: ['', Validators.required],
      due_date: ['', Validators.required],
      comment: ['', Validators.required],
      received_by: ['', Validators.required],
      boxes: '',
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
        this.userList = this.customerList.user;
      }
    });
    this.newBox = {number_of_boxes: '', quantity_per_box: ''};
    this.dynamicBoxes.push(this.newBox);
  }

  onSubmit(obj) {
    this.submitted = true;
    obj.value.due_date = this.datePipe.transform(obj.value.due_date, 'yyyy-MM-dd');
    obj.value.boxes = this.dynamicBoxes;
    obj.value.custom_order = this.customOrderId;
    if (this.packingListFrom.valid) {
      if (this.dynamicBoxes[0].number_of_boxes !== '' && this.dynamicBoxes[0].quantity_per_box !== '') {
        this.orderService.addPackingList(this.customOrderId, obj.value).subscribe(res => {
          this.toast.success('Packing List Created successfully!', '');
        });
      } else {
        this.validateFlag = true;
      }
    }
  }

  addRow(index) {
    this.newBox = {number_of_boxes: '', quantity_per_box: ''};
    this.dynamicBoxes.push(this.newBox);
    this.toast.success('New row added successfully', 'New Row');
    return true;
  }

  deleteRow(index) {
    if (this.dynamicBoxes.length === 1) {
      this.toast.error('Cannot delete the row when there is only one row', 'Warning');
        return false;
    } else {
        this.dynamicBoxes.splice(index, 1);
        this.toast.warning('Row deleted successfully', 'Delete row');
        return true;
    }
}



}
