import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedDataService } from 'src/app/banner-admin/services/shared-data.service';
import { UtilsFunction } from 'src/app/banner-admin/utils-function';
import { ProductService } from 'src/app/banner-admin/services/product.service';
import { OptionService } from 'src/app/banner-admin/services/option.service';
import { OptionModelComponent } from '../../option-groups/option-model/option-model.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  selectedFile: File;
  productId: number;
  recordId: number;
  subOptionId: number;
  editProductId = false;
  productDetail: any;
  productSubOption: any;
  pricesData = [];
  optionsData = [];
  productData = [];
  subOption = [];
  loading = true;
  imgFlag = false;
  updateImgValue: any;
  updateImg: any;
  dynamicSubOptions = [];
  optionObj = {};
  priceType;
  price;
  width_option;
  height_option;
  option_1;
  option_2;
  option_3;
  min_value;
  max_value;
  cal_price;

  constructor(
    private SpinnerService: NgxSpinnerService,
    private productService: ProductService,
    private sharedData: SharedDataService,
    private optionService: OptionService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private utils: UtilsFunction,
    private toast: ToastrService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = params['id'];
        this.getProductDetail(this.productId);
      }
    });
   }

  ngOnInit() {
    this.sharedData.priceTypes.subscribe(message => {
      this.pricesData = message;
    });
    this.sharedData.optionTypes.subscribe(message => {
      this.optionsData = message;
    });
    this.getProducts();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.updateImgValue = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        this.updateImg = e.target.result;
        this.imgFlag = true;
      };
    }
  }

  openModal(targetModal, subOptions) {
    this.subOption = subOptions;
    this.modalService.open(targetModal, { size: 'lg', centered: true });
  }

  editProduct() {
    this.editProductId = true;
    this.priceType = String(this.productDetail.price_type);
  }

  saveProduct(obj) {
    const formData = new FormData();
    formData.append('product_name', obj['product_name']);
    formData.append('one_unit_weight', obj['one_unit_weight']);
    formData.append('weight_unit', obj['weight_unit']);
    formData.append('price_type', obj['price_type']);
    formData.append('setup_cost', obj['setup_cost']);
    formData.append('product_description', obj['product_description']);
    formData.append('price_details', JSON.stringify(this.getPriceDetail()));
    if (this.imgFlag) {
      formData.append('default_product_image', this.updateImgValue);
    }
    this.productService.updateProduct(obj['id'], formData).subscribe(res => {
      this.editProductId = false;
      this.emptyFields();
      this.toast.success('Product updated successfully!', '');
    });
  }

  cancelProduct() {
    this.editProductId = false;
    this.imgFlag = false;
    this.emptyFields();
  }

  editOption(id) {
    this.recordId = id;
  }

  editSubOption(id) {
    this.subOptionId = id;
  }

  getPriceDetail() {
    let price_details = {};
    if (this.priceType === '1') {
      price_details['price'] = this.price;
      price_details['labels'] = [this.width_option, this.height_option];

    } else if (this.priceType === '4') {
      price_details['sequence'] = [this.option_1, this.option_2];

    } else if (this.priceType === '11') {
      price_details['sequence'] = [this.option_1, this.option_3, this.option_3];

    } else if (this.priceType === '5') {
      const price_key = this.min_value + '-' + this.max_value;
        price_details[price_key] = this.cal_price;

    } else {
      price_details = {};
    }
    return price_details;
  }

  saveSubOption(obj) {
    this.optionService.updateSubOption(obj['id'], obj).subscribe(res => {
      this.subOptionId = null;
      this.toast.success('Sub option updated successfully!', '');
    });
  }

  saveOptions(obj) {
    this.optionService.updateOptions(obj['id'], obj).subscribe(res => {
      this.recordId = null;
      this.toast.success('Option updated successfully!', '');
    });
  }

  showByPriceType(event) {
    this.priceType = event.target.value;
  }

  openProductOptionModal(type) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = type === 'register' ? 'lg' : '';
    modalOptions.windowClass = type + '-modal';

    const modalRef = this.modalService.open(OptionModelComponent, modalOptions);
    modalRef.componentInstance.modalType = type;
    modalRef.componentInstance.productId = this.productId;
    modalRef.componentInstance.optionsData = this.optionsData;
    modalRef.componentInstance.products = this.productData;

  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.productData = res.results;
    });
  }

  getProductDetail(productId) {
    this.loading = true;
    this.SpinnerService.show();
    this.productService.getProducts(productId).subscribe( res => {
      this.productDetail = res;
      this.productSubOption = res.option_set;
      this.SpinnerService.hide();
      this.loading = false;
    });
  }

  emptyFields() {
    this.priceType = this.price = this.width_option = this.height_option = null;
    this.option_1 = this.option_2 = this.option_3 = this.min_value = this.max_value = this.cal_price = null;
  }

}
