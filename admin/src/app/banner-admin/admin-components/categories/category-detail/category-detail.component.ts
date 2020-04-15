import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UtilsFunction } from 'src/app/banner-admin/utils-function';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService,
    private utils: UtilsFunction,
    private SpinnerService: NgxSpinnerService, private toast: ToastrService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.categoryId = params['id'];
        this.getProductDetail(this.categoryId);
      }
    });
   }

  ngOnInit(): void {
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
    this.apiService.getCategories(categoryId).subscribe( res => {
      this.categoryDetail = res;
      this.SpinnerService.hide();
      this.loading = false;
    });
  }

  editCategory() {
    this.editCategorytId = true;
  }

  saveCategory(obj) {
    const formData = new FormData();
    formData.append('name', obj['name']);
    formData.append('default_category_image', this.updateImgValue);
    if (this.imgFlag) {
      formData.append('default_category_image', this.updateImgValue);
    }
    this.apiService.updateCategory(obj['id'], formData).subscribe(res => {
      this.editCategorytId = false;
      this.toast.success('Category updated successfully!', '');
    });
  }

}
