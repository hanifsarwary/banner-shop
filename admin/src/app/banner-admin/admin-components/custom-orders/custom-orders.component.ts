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

  @Input() customerList;
  @Input() operation = 'Add';
  @Input() orderList: CustomOrderList;

  public customOrderForm: FormGroup;
  sharedObj;
  submitted = false;
  validateFlag = false;
  userList = [];
  allCustomers = [];
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
      due_date: [''],
      custom_job_name: ['', Validators.required],
      custom_product_name: ['', Validators.required],
      custom_quantity: [0, Validators.required],
      custom_version: ['', Validators.required],
      custom_proof: [''],
      custom_sample: [''],
      custom_paper: ['', Validators.required],
      flat_size: ['', Validators.required],
      ink_color: ['', Validators.required],
      internal_notes: [''],
      reference_number: [''],
      ticket_count: [0],
      special_instructoon: [''],
      quoted_price: [''],
      final_size: ['', Validators.required],
      proof_status: [''],
      customer: [''],
      start_date: [''],
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
      this.orderList = res;
      this.shipping = this.orderList.shipping_type;
      this.customerList = this.orderList.customer;
      this.customerId = this.customerList.id;
      this.companyName = this.customerList.company_name;
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
      this.allCustomers = res.results;
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
    this.customerId = null;
    this.customerId = event.target.value;
    this.customerList = this.getObjFromJsonArray(this.customerId);
    this.customerList = this.customerList[0];
    this.customerId = this.customerList.id;
    this.companyName = this.customerList.company_name;
  }

  selectedCompanies(event) {
    this.companyName = null;
    this.companyName = event.target.value;
    this.customerList = this.getCompanyFromCustomerObj(this.companyName);
    this.customerList = this.customerList[0];
    this.customerId = this.customerList.id;
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
        obj.value.customer = this.customerId ? this.customerId : this.customerList.id;
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
      obj.value.customer = this.customerList.id;
      obj.value.added_by = this.userInfo.id;
      this.orderServeice.updateCustomOrder(this.orderList.id, obj.value).subscribe(res => {
        this.toast.success('Custom Orders updated successfully!', '');
        this.router.navigate(['/order-status']);
      });
    }
  }

  getObjFromJsonArray(id) {
    return this.allCustomers.filter(function(item) {
      // tslint:disable-next-line: radix
      return parseInt(item.id) === parseInt(id);
    });
  }

  getCompanyFromCustomerObj(value) {
    return this.allCustomers.filter(function(item) {
      return item.company_name === value;
    });
  }

}
