import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  orderId;
  invoice_number;
  modelActive;
  status;
  statusList;
  operationType;
  funtionType;

  constructor(
    private orderService: OrderService,
    public activeModal: NgbActiveModal,
    ) { }

  ngOnInit(): void { }

  updateInvoice() {
    this.orderService.updateOrderField(this.orderId, {'invoice_number': this.invoice_number}).subscribe(res => {
      window.location.reload();
    });
  }

  updateStatus() {
    this.orderService.updateOrderField(this.orderId, {'status': this.status}).subscribe(res => {
      window.location.reload();
    });
  }

  asIsOrder(a, b) {
    return 1;
  }

}
