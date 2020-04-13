import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/banner-admin/services/shared-data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;
  recordId: number;
  subOptionId: number;
  editProductId = false;
  productDetail: any;
  productSubOption: any;
  pricesData = [];
  optionsData = [];
  subOption = [];
  loading = true;
  constructor(private route: ActivatedRoute, private apiService: ApiService,
    private modalService: NgbModal, private sharedData: SharedDataService,
    private SpinnerService: NgxSpinnerService, private toast: ToastrService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = params['id'];
        this.getProductDetail(this.productId);
      }
    });
   }

  openModal(targetModal, subOptions) {
    this.subOption = subOptions;
    this.modalService.open(targetModal, { size: 'lg', centered: true });
  }

  ngOnInit() {
    this.sharedData.priceTypes.subscribe(message => {
      console.log('------------------');
      console.log(this.pricesData);
      this.pricesData = message;
    });
    this.sharedData.optionTypes.subscribe(message => {
      console.log('------------------------');
      console.log(message);
      this.optionsData = message;
    });
  }

  editProduct() {
    this.editProductId = true;
  }

  saveProduct(obj) {
    const productObj = {};
    productObj['product_name'] = obj['product_name'];
    productObj['one_unit_weight'] = obj['one_unit_weight'];
    productObj['weight_unit'] = obj['weight_unit'];
    productObj['price_type'] = obj['price_type'];
    productObj['product_description'] = obj['product_description'];
    productObj['setup_cost'] = obj['setup_cost'];
    this.apiService.updateProduct(obj['id'], productObj).subscribe(res => {
      this.editProductId = false;
      this.toast.success('Product updated successfully!', '');
    });
  }

  editOption(id) {
    this.recordId = id;
  }

  editSubOption(id) {
    this.subOptionId = id;
  }

  saveSubOption(obj) {
    this.apiService.updateSubOption(obj['id'], obj).subscribe(res => {
      this.subOptionId = null;
      this.toast.success('Sub option updated successfully!', '');
    });
  }

  saveOptions(obj) {
    this.apiService.updateOptions(obj['id'], obj).subscribe(res => {
      this.recordId = null;
      this.toast.success('Option updated successfully!', '');
    });
  }

  getProductDetail(productId) {
    this.loading = true;
    this.SpinnerService.show();
    this.apiService.getProducts(productId).subscribe( res => {
      this.productDetail = res;
      this.productSubOption = res.option_set;
      this.SpinnerService.hide();
      this.loading = false;
    });
  }

}
