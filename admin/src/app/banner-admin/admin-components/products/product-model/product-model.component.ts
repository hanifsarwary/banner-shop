import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/banner-admin/services/product.service';

@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.css']
})
export class ProductModelComponent implements OnInit {

  @Input() categories;
  @Input() priceTypes;
  public productForm: FormGroup;
  calculatedPrice = 75;
  isChild = false;
  priceType: string;

  constructor(
    private productService: ProductService,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      product_name: ['', [Validators.minLength(3), Validators.required]],
      category: [''],
      one_unit_weight: [0, ''],
      weight_unit: [1, ''],
      price_type: [],
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

  openPriceModel(event) {
    this.priceType = event.target.value;
  }

  getPriceDetail() {
    let price_details = {};
    if (this.productForm.get('price_type').value === '1') {
      price_details['price'] = this.productForm.get('price').value;
      price_details['labels'] = [this.productForm.get('width_option').value, this.productForm.get('height_option').value];

    } else if (this.productForm.get('price_type').value === '4') {
      price_details['sequence'] = [this.productForm.get('option_1').value, this.productForm.get('option_2').value];

    } else if (this.productForm.get('price_type').value === '11') {
      price_details['sequence'] = [this.productForm.get('option_1').value, this.productForm.get('option_2').value, this.productForm.get('option_3').value];

    } else if (this.productForm.get('price_type').value === '5') {
      const price_key = this.productForm.get('min_value').value + '-' + this.productForm.get('max_value').value;
        price_details[price_key] = this.productForm.get('cal_price').value;

    } else {
      price_details = {};
    }
    return price_details;
  }

  getFormDataObj() {
    const formData = new FormData();
    formData.append('product_name', this.productForm.get('product_name').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('default_product_image', this.productForm.get('file').value);
    formData.append('one_unit_weight', this.productForm.get('one_unit_weight').value);
    formData.append('weight_unit', this.productForm.get('weight_unit').value);
    formData.append('price_type', this.productForm.get('price_type').value);
    formData.append('product_description', this.productForm.get('product_description').value);
    formData.append('is_coupon_allowed', this.productForm.get('is_coupon_allowed').value);
    formData.append('is_featured', this.productForm.get('is_featured').value);
    formData.append('price_details', JSON.stringify(this.getPriceDetail()));
    return formData;
  }

  submitForm(): void {
    const formData = this.getFormDataObj();
    this.productService.addProduct(formData).subscribe(res => {
      this.productForm.reset();
      this.activeModal.close();
      this.toast.success('Product added successfully!', '');
    });
  }

}
