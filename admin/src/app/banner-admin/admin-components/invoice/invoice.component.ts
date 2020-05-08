import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { InvoiceList } from '../model/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoiceForm: FormGroup;
  invoiceObj: InvoiceList;
  submitted = false;
  window;
  customOrderId: number;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private toast: ToastrService,
    private route: ActivatedRoute,
    ) {
      this.window = window;
    this.invoiceForm = this.fb.group({
      authorization_code: ['', Validators.required],
      invoice_number: ['', Validators.required],
      paid_by: ['', Validators.required],
      payment_method: ['', Validators.required],
      sold_to: ['', Validators.required],
      custom_order: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.customOrderId = params['id'];
      }
    });
  }

  getInvoice() {
    this.orderService.getCustomerOrderInvoice(this.customOrderId).subscribe(res => {
      this.invoiceObj =  res ? res[0] : [];
    });
  }

  submitinvoiceForm(obj) {
    this.submitted = true;
    if (this.invoiceObj) {
      obj.value.custom_order = this.customOrderId;
      this.orderService.updateInvoices(this.invoiceObj['id'], obj.value).subscribe(res => {
        this.toast.success('Invoice Updated successfully!', '');
      });
    } else {
      if (this.invoiceForm.valid) {
        this.orderService.addInvoices(obj.value).subscribe(res => {
          this.toast.success('Invoice added successfully!', '');
          this.invoiceForm.reset();
          this.submitted = false;
        });
      }
    }
  }

}
