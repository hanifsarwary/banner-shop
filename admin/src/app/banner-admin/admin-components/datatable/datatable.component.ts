import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../../services/api.service';
import { UtilsFunction } from '../../utils-function';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  providers: [NgbActiveModal]
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
  emailModalReference = null;
  invoiceModalReference = null;
  proofHistoryModalReference = null;
  sourceData;
  proofStatus;
  invoiceForm: FormGroup;
  emailForm: FormGroup;
  expandedElement: null;
  detailObj = [];
  customerInfo = [];
  subCategoryDetail = [];
  proofHistoryList = [];
  proofStatusList = [];
  invoiceObj = [];
  userInfo = [];
  customerEmail = '';
  customOrderId: number;
  optionLoading = false;
  noOption = false;
  currentId = false;
  loader = true;
  emailContent;
  window: any;

  constructor(
    public activeModal: NgbActiveModal,
    private apiService: ApiService,
    private utils: UtilsFunction,
    private modalService: NgbModal,
    private toast: ToastrService,
    private fb: FormBuilder) {
      this.window = window;
      this.invoiceForm = this.fb.group({
        authorization_code: [''],
        invoice_number: [''],
        paid_by: [''],
        payment_method: [''],
        sold_to: [''],
        custom_order: ['']
      });
      this.emailForm = this.fb.group({
        to: '',
        subject: '',
        message: ''
      });
    }

  ngOnChanges() {
    this.sourceData = new MatTableDataSource(this.dataSource);
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
    this.getProofStatus();
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
    this.invoiceModalReference = this.modalService.open(targetModal);
  }

  submitinvoiceForm(obj) {
    if (this.invoiceObj) {
      obj.value.custom_order = this.customOrderId;
      this.apiService.updateInvoices(this.invoiceObj['id'], obj.value).subscribe(res => {
        this.toast.success('Invoice Updated successfully!', '');
        this.invoiceModalReference.close();
      });
    } else {
      this.apiService.addInvoices(obj.value).subscribe(res => {
        this.toast.success('Invoice added successfully!', '');
        this.invoiceModalReference.close();
      });
    }
  }

  openEmailModal(targetModal, customerEmail, customerInfo) {
    this.customerInfo = [];
    this.userInfo = [];
    this.customerInfo = customerInfo;
    this.customerEmail = '';
    this.customerEmail = customerEmail.email ? customerEmail.email : '';
    this.userInfo = customerEmail;
    this.emailContent = `Dear ${this.userInfo['first_name']},
      your order for ${this.customerInfo['job_name']} is ready.
      Order Detail:
      Product Name: ${this.customerInfo['custom_product_name']}
      Quantity: ${this.customerInfo['custom_quantity']}
      Ink Color: ${this.customerInfo['ink_color']}
      Options:
      Substrate:
      Proof: ${this.customerInfo['proof_status']}
      Turnaround:
    Thank you,`;
    this.emailModalReference = this.modalService.open(targetModal, { size: 'lg'});
  }

  sendEmail(obj) {
    obj.value.subject = `your Order ${this.customerInfo['reference_number']} with
                         ${this.customerInfo['job_name']} is ${this.customerInfo['status']}`;
    this.apiService.sendEmailtoCustomer(obj.value).subscribe(res => {
      this.toast.success('Email sended successfully!', '');
      this.emailModalReference.close();
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

  getProofStatus() {
    this.apiService.getProofStatus().subscribe(res => {
      this.proofStatusList = res.types;
    });
  }

  updateProofStatus() {
    this.apiService.updateProofStatus(this.customOrderId , {'proof_status': this.proofStatus}).subscribe(res => {
      this.toast.success('Proof status updated successfully!', '');
      this.proofHistoryModalReference.close();
      this.customOrderId = null;
    });
  }

  openProofDetailModal(targetModal, proofStatus, objId) {
    this.customOrderId = null;
    this.loader = true;
    this.proofHistoryList = [];
    this.proofStatus = proofStatus;
    this.customOrderId = objId;
    this.apiService.getProofHistory(objId).subscribe(res => {
      this.proofHistoryList = res;
      this.loader = false;
    });
    this.proofHistoryModalReference = this.modalService.open(targetModal);
  }
}
