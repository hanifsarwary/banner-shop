import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CustomOrderList } from '../model/custom-order';

@Component({
  selector: 'app-custom-orders',
  templateUrl: './custom-orders.component.html',
  styleUrls: ['./custom-orders.component.scss']
})
export class CustomOrdersComponent implements OnInit {

  public customOrderForm: FormGroup;
  operation = 'Add';
  customOrderId: number;
  userList = [];
  customerList = [];
  invoicesList = [];
  statusList = [];
  customOrderList: CustomOrderList;

  constructor(private fb: FormBuilder, private apiServeice: ApiService,
    private toast: ToastrService) {

    this.customOrderForm = this.fb.group({
      due_date: [''],
      details: [''],
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
      start_date: [''],
      status: [''],
      ticket_count: [0, ''],
      special_instructoon: [''],
      customer: [''],
      invoice: [''],
      added_by: ['']
    });
   }

  ngOnInit(): void {
    this.getCustomers();
    this.getInvoices();
    this.getUsers();
    this.getStatus();
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

  onSubmit(obj) {
    if (this.operation === 'Add') {
      this.apiServeice.addCustomOrder(obj.value).subscribe(res => {
        this.toast.success('Custom Orders added successfully!', '');
        this.customOrderForm.reset();
      });
    } else {
      this.apiServeice.updateCustomOrder(this.customOrderId, obj.value).subscribe(res => {
        this.toast.success('Custom Orders updated successfully!', '');
      });
    }
  }

}
