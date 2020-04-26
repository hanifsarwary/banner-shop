import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CustomOrderList } from '../model/custom-order';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-orders',
  templateUrl: './custom-orders.component.html',
  styleUrls: ['./custom-orders.component.scss'],
  providers: [NgbActiveModal]
})
export class CustomOrdersComponent implements OnInit {

  public customOrderForm: FormGroup;
  operation = 'Add';
  customOrderId: number;
  userList = [];
  customerList = [];
  invoicesList = [];
  statusList = [];
  customerId: number;
  selectedCustomerObj: any;
  customOrderList: CustomOrderList;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private router: Router,
    private apiServeice: ApiService,
    private toast: ToastrService) {

    this.customOrderForm = this.fb.group({
      due_date: [''],
      custom_job_name: [''],
      custom_product_name: [''],
      custom_quantity: [0, ''],
      custom_version: [''],
      custom_proof: [''],
      custom_sample: [''],
      custom_paper: [''],
      flat_size: [''],
      ink_color: [''],
      internal_notes: [''],
      job_number: [0, ''],
      reference_number: [''],
      ticket_count: [0, ''],
      special_instructoon: [''],
      customer: [''],
      start_date: [''],
      status: [''],
    });
   }

  ngOnInit(): void {
    this.getCustomers();
    this.getInvoices();
    this.getUsers();
    this.getStatus();
  }

  customerPage() {
    this.router.navigate(['/customers']);
  }

  getUsers() {
    this.apiServeice.getUsers().subscribe(res => {
      this.userList = res.results;
    });
  }

  getCustomers() {
    this.apiServeice.getCustomers().subscribe(res => {
      this.customerList = res.results;
    });
  }

  getStatus() {
    this.apiServeice.getStatus().subscribe(res => {
      this.statusList = res.types;
    });
  }

  getInvoices() {
    this.apiServeice.getInvoices().subscribe(res => {
      this.invoicesList = res.results;
    });
  }

  selectedCustomer(event) {
    this.customOrderId = null;
    this.customOrderId = event.target.value;
    this.selectedCustomerObj = this.getObjFromJsonArray(this.customOrderId);
    this.selectedCustomerObj = this.selectedCustomerObj[0];
  }

  onSubmit(obj) {
    if (this.operation === 'Add') {
      const today = new Date();
      const start_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
      obj.value.customer = this.customOrderId;
      obj.value.status = 'Submitted';
      obj.value.start_date = start_date;
      this.apiServeice.addCustomOrder(obj.value).subscribe(res => {
        this.toast.success('Custom Orders added successfully!', '');
        this.customOrderForm.reset();
      });
    } else {
      obj.value.customer = this.selectedCustomerObj.id;
      this.apiServeice.updateCustomOrder(this.customOrderId, obj.value).subscribe(res => {
        this.toast.success('Custom Orders updated successfully!', '');
        this.activeModal.close();
      });
    }
  }

  getObjFromJsonArray(id) {
    return this.customerList.filter(function(item) {
      // tslint:disable-next-line: radix
      return parseInt(item.id) === parseInt(id);
    });
  }

}
