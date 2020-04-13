import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private route: ActivatedRoute, private apiService: ApiService,
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
    const categoryObj = {};
    categoryObj['name'] = obj['name'];
    // categoryObj['one_unit_weight'] = obj['one_unit_weight'];
    this.apiService.updateCategory(obj['id'], categoryObj).subscribe(res => {
      this.editCategorytId = false;
      this.toast.success('Category updated successfully!', '');
    });
  }

}
