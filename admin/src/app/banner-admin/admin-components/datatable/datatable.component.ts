import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { UtilsFunction } from '../../utils-function';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOrdersComponent } from '../custom-orders/custom-orders.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DatatableComponent implements OnChanges {

  @Output() categoryItemEvent = new EventEmitter();
  @Input() datatableColumns: [];
  @Input() dataSource: [];
  @Input() pagination = true;
  @Input() tableBorder = false;
  @Input() borderedRows = true;
  @Input() optionExpand = false;
  @Input() productExpand = false;
  @Input() categoryExpand = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  sourceData;
  invoiceForm: FormGroup;
  emailForm: FormGroup;
  expandedElement: null;
  detailObj = [];
  customerInfo = [];
  subCategoryDetail = [];
  invoiceObj = [];
  customerEmail = '';
  customOrderId: number;
  optionLoading = false;
  noOption = false;
  currentId = false;

  constructor(private apiService: ApiService,
    private utils: UtilsFunction,
    private modalService: NgbModal,
    private toast: ToastrService,
    private fb: FormBuilder) {
      this.invoiceForm = this.fb.group({
        authorization_code: [''],
        invoice_number: [''],
        paid_by: [''],
        payment_method: [''],
        sold_to: [''],
        custom_order: ['']
      });
      this.emailForm = this.fb.group({
        to: [''],
        subject: [''],
        message: this.fb.group({
          product: [''],
          quantity: [''],
          ink: [''],
          option: [''],
          proof: ['']
        })
      });
    }

  ngOnChanges() {
    this.sourceData = new MatTableDataSource(this.dataSource);
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  categoryEvent(type, entryId) {
    const data = {
      type: type,
      record: entryId
    };
    this.categoryItemEvent.emit(data);
  }

  expandDetail(id) {
    this.currentId = id;
    this.detailObj = [];
    this.optionLoading = false;
    this.noOption = false;
    if (this.optionExpand) {
      this.apiService.getSubOption(id).subscribe(res => {
        this.detailObj = res;
        if (this.detailObj.length) {
          this.detailObj = res;
          this.optionLoading = true;
        } else {
          this.optionLoading = true;
          this.noOption = true;
        }});
    } else if (this.productExpand) {
      this.apiService.getProducts(id).subscribe(res => {
        this.detailObj = res.option_set;
        if (this.detailObj.length) {
          this.optionLoading = true;
        } else {
          this.optionLoading = true;
          this.noOption = true;
        }
      });
    } else if (this.categoryExpand) {
      this.apiService.getSubCategory(id).subscribe(res => {
        this.detailObj = res;
        if (this.detailObj.length) {
          this.detailObj = res;
          this.optionLoading = true;
        } else {
          this.optionLoading = true;
          this.noOption = true;
        }
      });
    }
  }

  openInvoiceModal(targetModal, id) {
    this.customOrderId = id;
    this.invoiceObj = [];
    this.apiService.getCustomerOrderInvoice(this.customOrderId).subscribe(res => {
      this.invoiceObj =  res ? res[0] : [];
    });
    this.modalService.open(targetModal);
  }

  submitinvoiceForm(obj) {
    if (this.invoiceObj) {
      obj.value.custom_order = this.customOrderId;
      console.log(obj.value);
      this.apiService.updateInvoices(this.invoiceObj['id'], obj.value).subscribe(res => {
        this.toast.success('Invoice Updated successfully!', '');
      });
    } else {
      this.apiService.addInvoices(obj.value).subscribe(res => {
        this.toast.success('Invoice added successfully!', '');
        this.invoiceForm.reset();
      });
    }
  }

  openEmailModal(targetModal, customerEmail, customerInfo) {
    this.customerInfo = customerInfo;
    this.customerEmail = '';
    this.customerEmail = customerEmail.email ? customerEmail.email : '';
    this.modalService.open(targetModal, { size: 'lg'});
  }

  sendEmail(obj) {
    this.apiService.sendEmailtoCustomer(obj.value).subscribe(res => {
      this.toast.success('Email sended successfully!', '');
      this.emailForm.reset();
    });
  }

  openModal(type, data) {
    const modalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(CustomOrdersComponent, modalOptions);
    modalRef.componentInstance.modalType = type;
    modalRef.componentInstance.customOrderList = data;
    modalRef.componentInstance.operation = 'Update';
    modalRef.componentInstance.customOrderId = data.id;
    modalRef.componentInstance.selectedCustomerObj = data.customer;
  }
}
