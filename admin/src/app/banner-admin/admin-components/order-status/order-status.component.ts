import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {

  tableColumns = ['no', 'work_order', 'invoice_no', 'po_ref_no', 'job_name', 'product_info',
  'submitted_date', 'due_date', 'job_status', 'actual_ship_date', 'company', 'proof_status',
  'payment', 'placed_by', 'work_by', 'create_packing_list', 'send_email', 'edit_order'];

  customOrderList = [];
  filters = {};

  constructor(private apiService: ApiService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['filterObj']) {
        this.filters = JSON.parse(params['filterObj']);
        this.getCustomOrder();
      } else {
        this.filters = {};
        this.getCustomOrder();
      }
    });
  }

  getCustomOrder() {
    this.apiService.getCustomOrder(this.filters).subscribe(res => {
      this.customOrderList = res.results;
    });
  }

}
