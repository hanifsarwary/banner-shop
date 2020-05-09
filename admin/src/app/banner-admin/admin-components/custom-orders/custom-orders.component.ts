import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { CustomOrderList } from '../model/custom-order';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypesService } from '../../services/types.service';
import { OrderService } from '../../services/order.service';
import { SharedDataService } from '../../services/shared-data.service';

@Component({
  selector: 'app-custom-orders',
  templateUrl: './custom-orders.component.html',
  styleUrls: ['./custom-orders.component.scss'],
  providers: [NgbActiveModal]
})
export class CustomOrdersComponent implements OnInit {

  @Input() selectedCustomerObj;
  @Input() operation = 'Add';
  @Input() customerOrderId;
  @Input() customOrderList: CustomOrderList;

  public customOrderForm: FormGroup;
  sharedObj;
  submitted = false;
  validateFlag = false;
  userList = [];
  customerList = [];
  invoicesList = [];
  statusList = [];
  proofStatusList = [];
  companyName;
  companiesList = [];
  customerId: number;
  job_no_exist = false;
  job_id;
  opeFlag = true;
  shipping;
  loader = true;
  userInfo = JSON.parse(localStorage.getItem('userInfo'));

  constructor(
    private orderServeice: OrderService,
    private typeService: TypesService,
    private data: SharedDataService,
    private apiServeice: ApiService,
    private toast: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

    this.customOrderForm = this.fb.group({
      due_date: ['', Validators.required],
      custom_job_name: ['', Validators.required],
      custom_product_name: ['', Validators.required],
      custom_quantity: [0, Validators.required],
      custom_version: ['', Validators.required],
      invoice_number: ['', Validators.required],
      custom_proof: ['', Validators.required],
      custom_sample: ['', Validators.required],
      custom_paper: ['', Validators.required],
      flat_size: ['', Validators.required],
      ink_color: ['', Validators.required],
      internal_notes: ['', Validators.required],
      reference_number: ['', Validators.required],
      ticket_count: [0, Validators.required],
      special_instructoon: ['', Validators.required],
      quoted_price: ['', Validators.required],
      final_size: ['', Validators.required],
      proof_status: [''],
      customer: [''],
      start_date: [''],
      status: [''],
      added_by: '',
      shipping_type: [''],
      shipping_contact_name: [''],
      shipping_street_address: [''],
      shipping_city: [''],
      shipping_state: [''],
      shipping_zip_code: ['']
    });
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.operation = params['operation'];
        this.opeFlag = this.operation === 'Update' ? false : true;
        this.getCustomOrderById(params['id']);
      }
    });
   }

  ngOnInit(): void {
    this.getCustomers();
    this.getUsers();
    this.getStatus();
    this.getProofStatus();
    this.getCompanies();
    this.getJobId();
  }

  getCustomOrderById(id) {
    this.loader = true;
    this.orderServeice.getCustomOrderById(id).subscribe(res => {
      this.customOrderList = res;
      this.selectedCustomerObj = this.customOrderList.customer;
      this.customerOrderId = this.selectedCustomerObj.id;
      this.loader = false;
    });
  }

  get formValidator() { return this.customOrderForm.controls; }

  customerPage() {
    this.router.navigate(['/customers']);
  }

  getJobId() {
    this.orderServeice.getJobId().subscribe(res => {
      this.job_id = res.number;
    });
  }

  getUsers() {
    this.apiServeice.getUsers().subscribe(res => {
      this.userList = res.results;
    });
  }

  getCustomers() {
    this.orderServeice.getCustomers().subscribe(res => {
      this.customerList = res.results;
    });
  }

  getCompanies() {
    this.typeService.getCompanies().subscribe(res => {
      this.companiesList = res.names;
    });
  }

  getStatus() {
    this.typeService.getStatus().subscribe(res => {
      this.statusList = res.types;
    });
  }

  getProofStatus() {
    this.typeService.getProofStatus().subscribe(res => {
      this.proofStatusList = res.types;
    });
  }

  getInvoices() {
    this.orderServeice.getInvoices().subscribe(res => {
      this.invoicesList = res.results;
    });
  }

  selectedCustomer(event) {
    this.customerOrderId = null;
    this.customerId = event.target.value;
    this.customerOrderId = event.target.value;
    this.companyName = '';
    this.selectedCustomerObj = this.getObjFromJsonArray(this.customerOrderId);
    this.selectedCustomerObj = this.selectedCustomerObj[0];
  }

  selectedCompanies(event) {
    this.companyName = null;
    this.companyName = event.target.value;
    this.customerOrderId = '';
    this.selectedCustomerObj = this.getCompanyFromCustomerObj(this.companyName);
    this.selectedCustomerObj = this.selectedCustomerObj[0];
    this.customerId = this.selectedCustomerObj.id;
  }

  goToOrderStatus() {
    this.router.navigate(['/order-status']);
  }

  onSubmit(obj) {
    if (this.operation === 'Add' || this.operation === 'Clone' ) {
      this.submitted = true;
      if (this.customOrderForm.valid) {
        this.submitted = false;
        this.validateFlag = false;
        const today = new Date();
        const start_date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        obj.value.customer = this.customerId ? this.customerId : this.selectedCustomerObj.id;
        obj.value.status = 'Submitted';
        obj.value.start_date = start_date;
        obj.value.added_by = this.userInfo.id;
        this.orderServeice.addCustomOrder(obj.value).subscribe(res => {
            this.toast.success('Custom Orders added successfully!', '');
            this.router.navigate(['/order-status']);
            this.customOrderForm.reset();
        });
      } else {
        this.validateFlag = true;
      }
    } else {
      obj.value.customer = this.selectedCustomerObj.id;
      obj.value.added_by = this.userInfo.id;
      this.orderServeice.updateCustomOrder(this.customOrderList.id, obj.value).subscribe(res => {
        this.toast.success('Custom Orders updated successfully!', '');
        this.router.navigate(['/order-status']);
      });
    }
  }

  getObjFromJsonArray(id) {
    return this.customerList.filter(function(item) {
      // tslint:disable-next-line: radix
      return parseInt(item.id) === parseInt(id);
    });
  }

  getCompanyFromCustomerObj(value) {
    return this.customerList.filter(function(item) {
      return item.company_name === value;
    });
  }

}
