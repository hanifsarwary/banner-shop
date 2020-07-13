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
import { PackingList } from '../model/packing-list';

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
  packingList: PackingList;
  userList: UserList;
  newBox: any = {};
  quantity;
  loader = true;
  submitted = false;
  validateFlag = false;
  updateObj = true;
  totalBoxes = 0;
  totalQuantity = 0;
  window;
  dynamicBoxes: Array<BoxList> = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private toast: ToastrService,
    private router: Router,
    private datePipe: DatePipe
    ) {
    this.window = window;
    this.packingListFrom = this.fb.group({
      first_name: [''],
      last_name: [''],
      address: [''],
      city: [''],
      company_name: [''],
      phone_number: [''],
      zip_code: [''],
      due_date: [''],
      comments: [''],
      received_by: [''],
      boxes: '',
      custom_order: ''
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.customOrderId = params['id'];
        this.getPackingList(this.customOrderId);
        this.getOrderList(this.customOrderId);
      }
    });
    this.newBox = {number_of_boxes: '', quantity_per_box: '', job_name: ''};
    this.dynamicBoxes.push(this.newBox);
  }

  getOrderList(id) {
    this.orderService.getCustomOrderById(id).subscribe(res => {
      this.customOrderList = res;
      this.customerList = this.customOrderList.customer;
      this.userList = this.customerList.user;
    });
  }

  getPackingList(id) {
    this.loader = true;
    this.orderService.getPackingList(id).subscribe(res => {
      if (res.length !== 0) {
        this.updateObj = false;
        this.packingList = res[0];
        this.dynamicBoxes = this.packingList.boxes;
        this.calculateTotal();
        this.loader = false;
      } else {
        this.updateObj = true;
        this.loader = false;
      }
    });
  }

  calculateTotal() {
    this.totalBoxes = 0;
    this.totalQuantity = 0;
    for (let index = 0; index < this.dynamicBoxes.length; index++) {
      // tslint:disable-next-line: radix
      this.totalBoxes = this.totalBoxes + parseInt(this.dynamicBoxes[index].number_of_boxes);
      this.totalQuantity = this.totalQuantity + this.dynamicBoxes[index].quantity;
    }
  }

  onSubmit(obj) {
    this.submitted = true;
    obj.value.due_date = this.datePipe.transform(obj.value.due_date, 'yyyy-MM-dd');
    obj.value.custom_order = this.customOrderId;
    if (this.updateObj) {
      obj.value.boxes = this.dynamicBoxes[0].number_of_boxes ? this.dynamicBoxes : null;
      if (this.packingListFrom.valid) {
        this.orderService.addPackingList(this.customOrderId, obj.value).subscribe(res => {
          this.toast.success('Packing List Created successfully!', '');
          // this.router.navigate(['/order-status']);
        });
      }
    } else {
      this.orderService.updatePackingList(this.packingList.id, obj.value).subscribe(res => {
        this.toast.success('List updated successfully!', '');
        // this.router.navigate(['/order-status']);
      });
    }
  }

  saveBoxes() {
    const boxesList = [];
    for (let index = 0; index < this.dynamicBoxes.length; index++) {
      if (!this.dynamicBoxes[index].id) {
        this.dynamicBoxes[index]['packing_list'] = this.packingList.id;
        boxesList.push(this.dynamicBoxes[index]);
      }
    }
    this.orderService.createBoxesList({ 'boxes': boxesList}).subscribe(response => {
      this.toast.success('Added successfully!', '');
    });
  }

  calculateQuantity(obj, i) {
    this.quantity = obj.quantity_per_box * obj.number_of_boxes;
    this.dynamicBoxes[i].quantity = obj.quantity_per_box * obj.number_of_boxes;
    this.calculateTotal();
  }

  addRow() {
    this.newBox = {number_of_boxes: '', quantity_per_box: '', job_name: ''};
    this.dynamicBoxes.push(this.newBox);
    this.toast.success('New row added successfully', 'New Row');
    return true;
  }

  deleteRow(index, id?) {
    if (this.dynamicBoxes.length === 1) {
      this.toast.error('Cannot delete the row when there is only one row', 'Warning');
        return false;
    } else {
      if (id) {
        this.orderService.deleteBoxes(id).subscribe(res => {});
      }
      this.dynamicBoxes.splice(index, 1);
      this.calculateTotal();
      this.toast.warning('Row deleted successfully', 'Delete row');
      return true;
    }
}



}
