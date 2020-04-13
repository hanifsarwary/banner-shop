import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { ToastrService } from 'ngx-toastr';

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
      cal_price: [75, ''],
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
      price_details = {
        'price': this.productForm.get('price').value,
        'setup_cost': this.productForm.get('setup_cost').value
       };
    } else if (this.productForm.get('price_type').value === '2') {
      const price_key = this.productForm.get('min_value').value + '-' + this.productForm.get('max_value').value;
       price_details = {};
       price_details[price_key] = this.productForm.get('cal_price').value;
       price_details['setup_cost'] = this.productForm.get('setup_cost').value;
    } else {
      price_details = {};
    }
    return price_details;
  }

  calculatePrice(event) {
    if (this.productForm.get('max_value').value === 1 ) {
      this.calculatedPrice = 75;
    } else if (this.productForm.get('max_value').value <= 3) {
      this.calculatedPrice = 70;
    } else if (this.productForm.get('max_value').value >= 4 && this.productForm.get('max_value').value <= 11 ) {
      this.calculatedPrice = 65;
    }  else if (this.productForm.get('max_value').value >= 12 ) {
      this.calculatedPrice = 55;
    }
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
    this.apiService.addProduct(formData).subscribe(res => {
      this.productForm.reset();
      this.activeModal.close();
      this.toast.success('Product added successfully!', '');
    });
  }

}
