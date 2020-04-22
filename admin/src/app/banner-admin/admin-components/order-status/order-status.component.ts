import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  tableColumns = ['no', 'work_order', 'invoice_no', 'po_ref_no', 'job_name', 'product_info',
  'submitted_date', 'due_date', 'job_status', 'actual_ship_date', 'company', 'proof_status',
  'payment', 'placed_by', 'work_by', 'create_packing_list', 'edit_order'];

  customOrderList = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCustomOrder();
  }

  getCustomOrder() {
    this.apiService.getCustomOrder().subscribe(res => {
      this.customOrderList = res.results;
    });
  }

}
