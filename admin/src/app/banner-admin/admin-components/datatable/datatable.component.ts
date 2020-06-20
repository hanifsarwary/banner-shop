import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { UtilsFunction } from '../../utils-function';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomOrdersComponent } from '../custom-orders/custom-orders.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TypesService } from '../../services/types.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { OptionService } from '../../services/option.service';
import { OrderService } from '../../services/order.service';
import { SharedDataService } from '../../services/shared-data.service';
import { Router, NavigationExtras } from '@angular/router';
import { InvoiceComponent } from '../invoice/invoice.component';
import { DatePipe } from '@angular/common';

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
  providers: [NgbActiveModal, DatePipe]
})
export class DatatableComponent implements OnChanges {

  @Output() categoryItemEvent = new EventEmitter();
  @Output() sortColumn = new EventEmitter();
  @Output() reloadPage = new EventEmitter();
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
  proofHistoryModalReference = null;
  delModalReference = null;
  deleteOrderId: number;
  sourceData;
  proofStatus;
  emailForm: FormGroup;
  expandedElement: null;
  detailObj = [];
  customerInfo = [];
  subCategoryDetail = [];
  proofHistoryList = [];
  proofStatusList = [];
  customerStatusList = [];
  statusList = [];
  userInfo = [];
  customerEmail = '';
  customOrderId: number;
  optionLoading = false;
  noOption = false;
  currentId = false;
  loader = true;
  submitted = false;
  emailContent;
  window: any;
  sortColumID;
  sortingOrder = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private optionService: OptionService,
    public activeModal: NgbActiveModal,
    private typeService: TypesService,
    private orderService: OrderService,
    private modalService: NgbModal,
    private utils: UtilsFunction,
    private toast: ToastrService,
    private data: SharedDataService,
    private router: Router,
    private datePipe: DatePipe,
    private fb: FormBuilder) {
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
    this.getOrderStatus();
    this.getCustomerStatus();
  }

  categoryEvent(type, entryId) {
    const data = {
      type: type,
      record: entryId
    };
    this.categoryItemEvent.emit(data);
  }

  opendeleteModel(targetModal, id) {
    this.deleteOrderId = id;
    this.delModalReference = this.modalService.open(targetModal,  { size: 'sm'});
  }

  deleteOrders() {
    this.orderService.deleteOrder(this.deleteOrderId).subscribe(res => {
      this.toast.success('Delete Order successfully!', '');
      this.delModalReference.close();
      this.deleteOrderId = null;
      this.reloadPage.emit(true);
    });
  }

  expandDetail(id) {
    this.currentId = id;
    this.detailObj = [];
    this.optionLoading = false;
    this.noOption = false;
    if (this.optionExpand) {
      this.optionService.getSubOption(id).subscribe(res => {
        this.detailObj = res;
        if (this.detailObj.length) {
          this.detailObj = res;
          this.optionLoading = true;
        } else {
          this.optionLoading = true;
          this.noOption = true;
        }});
    } else if (this.productExpand) {
      this.productService.getProducts(id).subscribe(res => {
        this.detailObj = res.option_set;
        if (this.detailObj.length) {
          this.optionLoading = true;
        } else {
          this.optionLoading = true;
          this.noOption = true;
        }
      });
    } else if (this.categoryExpand) {
      this.categoryService.getSubCategory(id).subscribe(res => {
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
    this.orderService.sendEmailtoCustomer(obj.value).subscribe(res => {
      this.toast.success('Email sended successfully!', '');
      this.emailModalReference.close();
    });
  }

  editOrders(data) {
    const obj =  {
      'customOrderList': JSON.stringify(data),
      'operation': 'Update',
    };
    this.router.navigate(['/update-custom-orders'], {queryParams: obj, skipLocationChange: true });
  }

  cloneOrders(data) {
    const obj =  {
      'customOrderList': JSON.stringify(data),
      'operation': 'Clone',
    };
    this.router.navigate(['/clone-custom-orders'], {queryParams: obj, skipLocationChange: true });
  }

  getProofStatus() {
    this.typeService.getProofStatus().subscribe(res => {
      this.proofStatusList = res.types;
    });
  }

  getOrderStatus() {
    this.typeService.getStatus().subscribe(res => {
      this.statusList = res.types;
    });
  }

  updateProofStatus() {
    this.orderService.updateProofStatus(this.customOrderId , {'proof_status': this.proofStatus}).subscribe(res => {
      this.toast.success('Proof status updated successfully!', '');
      this.proofHistoryModalReference.close();
      this.customOrderId = null;
      this.reloadPage.emit(true);
    });
  }

  openProofDetailModal(targetModal, proofStatus, objId) {
    this.customOrderId = null;
    this.loader = true;
    this.proofHistoryList = [];
    this.proofStatus = proofStatus;
    this.customOrderId = objId;
    this.orderService.getProofHistory(objId).subscribe(res => {
      this.proofHistoryList = res;
      this.loader = false;
    });
    this.proofHistoryModalReference = this.modalService.open(targetModal);
  }

  applyBorder(value, status) {
    const compareDate = this.datePipe.transform(value, 'yyyy-MM-dd');
    const today = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrow_date = this.datePipe.transform(tomorrow , 'yyyy-MM-dd');

    if ( today === compareDate ) {
      return '#ffa500';
    } else if ( tomorrow_date === compareDate) {
      return '#ffff00';
    } else if ( compareDate < today && status === 'Shipped') {
      return '#ff69b4';
    } else {
      return;
    }
  }

  openOrderProofStatus(targetModal, objId, status) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = targetModal === 'register' ? 'lg' : '';
    modalOptions.windowClass = targetModal + '-modal';
    const modalRef = this.modalService.open(InvoiceComponent, modalOptions);
    modalRef.componentInstance.modalType = targetModal;
    modalRef.componentInstance.modelActive = 'orderProofStatus';
    modalRef.componentInstance.orderId = objId;
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.proofStatusList = this.proofStatusList;
    modalRef.componentInstance.operationType = 'Update Status';
    modalRef.componentInstance.funtionType = 'updateoOrderProofStatus';
  }

  openModalInvoice(targetModal, objId, invoiceNo) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = targetModal === 'register' ? 'lg' : '';
    modalOptions.windowClass = targetModal + '-modal';
    const modalRef = this.modalService.open(InvoiceComponent, modalOptions);
    modalRef.componentInstance.modalType = targetModal;
    modalRef.componentInstance.modelActive = 'invoice';
    modalRef.componentInstance.orderId = objId;
    modalRef.componentInstance.invoice_number = invoiceNo;
    modalRef.componentInstance.operationType = invoiceNo ? 'Update Invoice' : 'Add Invoice';
    modalRef.componentInstance.funtionType = 'updateInvoice';
  }

  updateOrderInvoice(targetModal, objId, invoiceNo) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = targetModal === 'register' ? 'lg' : '';
    modalOptions.windowClass = targetModal + '-modal';
    const modalRef = this.modalService.open(InvoiceComponent, modalOptions);
    modalRef.componentInstance.modalType = targetModal;
    modalRef.componentInstance.modelActive = 'orderInvoice';
    modalRef.componentInstance.orderId = objId;
    modalRef.componentInstance.invoice_number = invoiceNo;
    modalRef.componentInstance.operationType = invoiceNo ? 'Update Invoice' : 'Add Invoice';
    modalRef.componentInstance.funtionType = 'updateOrderInvoice';
  }

  customOrderStatusModel(targetModal, objId, status) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = targetModal === 'register' ? 'lg' : '';
    modalOptions.windowClass = targetModal + '-modal';
    const modalRef = this.modalService.open(InvoiceComponent, modalOptions);
    modalRef.componentInstance.modalType = targetModal;
    modalRef.componentInstance.modelActive = 'customOrderStatus';
    modalRef.componentInstance.orderId = objId;
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.statusList = this.statusList;
    modalRef.componentInstance.operationType = status ? 'Update Status' : 'Add Status';
    modalRef.componentInstance.funtionType = 'updateCustomOrderStatus';
  }

  orderStatusModel(targetModal, objId, status) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = targetModal === 'register' ? 'lg' : '';
    modalOptions.windowClass = targetModal + '-modal';
    const modalRef = this.modalService.open(InvoiceComponent, modalOptions);
    modalRef.componentInstance.modalType = targetModal;
    modalRef.componentInstance.modelActive = 'orderStatus';
    modalRef.componentInstance.orderId = objId;
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.statusList = this.statusList;
    modalRef.componentInstance.operationType = status ? 'Update Status' : 'Add Status';
    modalRef.componentInstance.funtionType = 'updateOrderStatus';
  }

  openModalCustomerStatus(targetModal, objId, status) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = targetModal === 'register' ? 'lg' : '';
    modalOptions.windowClass = targetModal + '-modal';
    const modalRef = this.modalService.open(InvoiceComponent, modalOptions);
    modalRef.componentInstance.modalType = targetModal;
    modalRef.componentInstance.modelActive = 'customerStatus';
    modalRef.componentInstance.customerId = objId;
    modalRef.componentInstance.status = status;
    modalRef.componentInstance.customerStatusTypes = this.customerStatusList;
    modalRef.componentInstance.operationType = 'Update Status';
    modalRef.componentInstance.funtionType = 'updateCustomerStatus';
  }

  getCustomerStatus() {
    this.orderService.getStatus().subscribe(res => {
      this.customerStatusList = res.types;
    });
  }

  sortingOnColumn(orderBy, id) {
    this.sortColumn.emit(orderBy);
  }

  stringify(obj) {
    return JSON.stringify(obj);
  }

}
