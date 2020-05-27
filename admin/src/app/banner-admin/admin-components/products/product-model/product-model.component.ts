import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/banner-admin/services/product.service';
import { ToolbarService, HtmlEditorService } from '@syncfusion/ej2-angular-richtexteditor';
import { DOCUMENT } from '@angular/common';
import { UtilsFunction } from 'src/app/banner-admin/utils-function';
import { ProductList } from '../../model/product';
@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.css'],
  providers: [ToolbarService, HtmlEditorService]
})
export class ProductModelComponent implements OnInit {

  @Input() categories;
  @Input() priceTypes;
  productId;
  showImageField = false;
  productList: ProductList;
  public productForm: FormGroup;
  calculatedPrice = 75;
  isChild = false;
  submitted = false;
  imgFlag = false;
  updateImgValue: any;
  updateImg: any;
  operation = 'Add';
  priceType: string;
  public iframe: object = { enable: true };
  public height = 200;
  public tools: object = {
    type: 'Multirow',
    items: ['Bold', 'Italic', 'Underline', '|',
          'FontName', 'FontSize', 'FontColor', '|', 'BackgroundColor', '|',
          'LowerCase', 'UpperCase', '|',
          'Formats', 'Alignments',
          'OrderedList', 'UnorderedList', '|',
          'Outdent', 'Indent', '|',
          'CreateLink', '|', 'Undo', 'Redo', '|']
        };
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private productService: ProductService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private utils: UtilsFunction,
    private apiService: ApiService,
    private toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      product_name: ['', [Validators.minLength(3), Validators.required]],
      category: ['', Validators.required],
      one_unit_weight: [0, ''],
      weight_unit: [1, ''],
      price_type: ['', Validators.required],
      product_description: [],
      is_coupon_allowed: false,
      is_featured: false,
      price: [''],
      setup_cost: [''],
      max_value: [1, ''],
      min_value: [1, ''],
      cal_price: [''],
      option_1: [''],
      option_2: [''],
      option_3: [''],
      width_option: [''],
      height_option: [''],
      file: ['', Validators.required],
    });
  }

  get contactControls() {
    return this.productForm.get('product')['controls'];
  }

  fileProgress(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.patchValue({
        file: file
      });
    }
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      this.updateImgValue = event.target.files[0];
      const file = event.target.files[0];
      this.productForm.patchValue({ file: file });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        this.updateImg = e.target.result;
        this.imgFlag = true;
      };
    }
  }

  openPriceModel(event) {
    this.priceType = event.target.value;
  }

  getPriceDetail() {
    let price_details = {};
    if (this.priceType === '1') {
      if (this.productForm.get('price').value || this.productForm.get('width_option').value) {
          price_details['price'] = this.productForm.get('price').value;
          price_details['labels'] = [this.productForm.get('width_option').value, this.productForm.get('height_option').value];
      } else {
        price_details = this.productList['price_details'];
      }

    } else if (this.priceType === '4') {
      if (this.productForm.get('option_1').value || this.productForm.get('option_2').value) {
        price_details['sequence'] = [this.productForm.get('option_1').value, this.productForm.get('option_2').value];
      } else {
        price_details = this.productList['price_details'];
      }
    } else if (this.priceType === '11') {
      if (this.productForm.get('option_1').value || this.productForm.get('option_2').value || this.productForm.get('option_3').value) {
        price_details['sequence'] = [this.productForm.get('option_1').value, this.productForm.get('option_2').value, this.productForm.get('option_3').value];
      } else {
        price_details = this.productList['price_details'];
      }
    } else if (this.priceType === '5') {
      if (this.productForm.get('min_value').value || this.productForm.get('max_value').value) {
      const price_key = this.productForm.get('min_value').value + '-' + this.productForm.get('max_value').value;
        price_details[price_key] = this.productForm.get('cal_price').value;
      } else {
        price_details = this.productList['price_details'];
      }
    } else {
      price_details = this.productList['price_details'];
    }
    return price_details;
  }

  getFormDataObj() {
    const formData = new FormData();
    formData.append('product_name', this.productForm.get('product_name').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('one_unit_weight', this.productForm.get('one_unit_weight').value);
    formData.append('weight_unit', this.productForm.get('weight_unit').value);
    formData.append('price_type', this.productForm.get('price_type').value);
    formData.append('product_description', this.document.getElementById('defaultRTE_rte-edit-view').innerHTML);
    formData.append('is_coupon_allowed', this.productForm.get('is_coupon_allowed').value);
    formData.append('is_featured', this.productForm.get('is_featured').value);
    formData.append('price_details', JSON.stringify(this.getPriceDetail()));
    if (this.imgFlag) {
      formData.append('default_product_image', this.productForm.get('file').value);
    }
    return formData;
  }

  submitForm(): void {
    if (this.operation === 'Add') {
      this.submitted = true;
      if (this.productForm.valid) {
        const formData = this.getFormDataObj();
        this.productService.addProduct(formData).subscribe(res => {
          this.toast.success('Product added successfully!', '');
          window.location.reload();
        });
      }
    } else {
      const formData = this.getFormDataObj();
      this.productService.updateProduct(this.productId, formData).subscribe(res => {
        window.location.reload();
      });
    }
  }

}
