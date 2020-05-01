import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UtilsFunction } from 'src/app/banner-admin/utils-function';
import { ProductService } from 'src/app/banner-admin/services/product.service';
import { CategoryService } from 'src/app/banner-admin/services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {

  categoryId: number;
  editCategorytId = false;
  categoryDetail: any;
  productList = [];
  subOption = [];
  loading = true;
  imgFlag = false;
  updateImgValue: any;
  updateImg: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private utils: UtilsFunction,
    private SpinnerService: NgxSpinnerService,
    private toast: ToastrService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.categoryId = params['id'];
      }
    });
   }

  ngOnInit(): void {
    this.getProductDetail(this.categoryId);
    this.getCategoryProducts(this.categoryId);
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

  getProductDetail(categoryId) {
    this.loading = true;
    this.SpinnerService.show();
    this.categoryDetail = [];
    this.categoryService.getCategories(categoryId).subscribe( res => {
      if (res) {
        this.categoryDetail = res;
        this.loading = false;
      }
    });
  }

  getCategoryProducts(categoryId) {
    this.productService.getProductsByCategory(categoryId).subscribe(res => {
      this.productList = res;
      this.SpinnerService.hide();
    });
  }

  editCategory() {
    this.editCategorytId = true;
  }

  saveCategory(obj) {
    const formData = new FormData();
    formData.append('name', obj['name']);
    if (this.imgFlag) {
      formData.append('default_category_image', this.updateImgValue);
    }
    this.categoryService.updateCategory(obj['id'], formData).subscribe(res => {
      this.editCategorytId = false;
      this.toast.success('Category updated successfully!', '');
    });
  }

}
