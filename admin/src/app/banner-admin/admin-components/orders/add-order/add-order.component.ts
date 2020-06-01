import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOrderList } from '../../model/custom-order';
import { OrderService } from 'src/app/banner-admin/services/order.service';
import { TypesService } from 'src/app/banner-admin/services/types.service';
import { ProductService } from 'src/app/banner-admin/services/product.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  providers: [NgbActiveModal]
})
export class AddOrderComponent implements OnInit {

  @Input() customerList;
  @Input() operation = 'Add';
  @Input() orderList: CustomOrderList;

  public orderForm: FormGroup;
  submitted = false;
  validateFlag = false;
  products = [];
  allCustomers = [];
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
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

    this.orderForm = this.fb.group({
      product: [''],
      due_date: [''],
      quoted_price: [''],
      internal_notes: [''],
      reference_number: [''],
      special_note: [''],
      customer: [''],
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
        this.getOrderById(params['id']);
      }
    });
   }

  ngOnInit(): void {
    this.getCustomers();
    this.getStatus();
    this.getProofStatus();
    this.getCompanies();
    this.getJobId();
    this.getProducts();
  }

  getOrderById(id) {
    this.loader = true;
    this.orderServeice.getOrderDetail(id).subscribe(res => {
      this.orderList = res;
      this.shipping = this.orderList.shipping_type;
      this.customerList = this.orderList.customer;
      this.customerId = this.customerList.id;
      this.companyName = this.customerList.company_name;
      this.loader = false;
    });
  }

  get formValidator() { return this.orderForm.controls; }

  getJobId() {
    this.orderServeice.getJobId().subscribe(res => {
      this.job_id = res.number;
    });
  }

  getCustomers() {
    this.orderServeice.getCustomers(`?status=${1}`).subscribe(res => {
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

  onSubmit(obj) {
    if (this.operation === 'Add' || this.operation === 'Clone' ) {
      this.submitted = true;
      if (this.orderForm.valid) {
        this.submitted = false;
        this.validateFlag = false;
        obj.value.customer = this.customerId ? this.customerId : this.customerList.id;
        obj.value.status = 'Submitted';
        this.orderServeice.addOrder(obj.value).subscribe(res => {
            this.router.navigate(['/orders']);
        });
      } else {
        this.validateFlag = true;
      }
    } else {
      obj.value.customer = this.customerList.id;
      this.orderServeice.updateOrder(this.orderList.id, obj.value).subscribe(res => {
        this.router.navigate(['/orders']);
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

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.products = res.results;
    });
  }

}
