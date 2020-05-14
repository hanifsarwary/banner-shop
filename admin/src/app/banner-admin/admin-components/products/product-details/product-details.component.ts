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
  }

  saveProduct(obj) {
    const formData = new FormData();
    formData.append('product_name', obj['product_name']);
    formData.append('one_unit_weight', obj['one_unit_weight']);
    formData.append('weight_unit', obj['weight_unit']);
    formData.append('price_type', obj['price_type']);
    formData.append('setup_cost', obj['setup_cost']);
    formData.append('product_description', obj['product_description']);
    if (this.imgFlag) {
      formData.append('default_product_image', this.updateImgValue);
    }
    this.productService.updateProduct(obj['id'], formData).subscribe(res => {
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

}
