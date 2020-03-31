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
  public productForm: FormGroup;
  fileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  isChild = false;

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

  submitForm(): void {
    const formData = new FormData();
    formData.append('product_name', this.productForm.get('product_name').value);
    formData.append('category', this.productForm.get('category').value);
    formData.append('default_product_image', this.productForm.get('file').value);

    this.apiService.addProduct(formData).subscribe(res => {
      this.productForm.reset();
      this.activeModal.close();
      this.toast.success('Product added successfully!', '');
    });
  }

}
