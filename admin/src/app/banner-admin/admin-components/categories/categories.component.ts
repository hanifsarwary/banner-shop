import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalAddCategoryComponent } from '../sub-components/modal-add-category/modal-add-category.component';
import { SharedDataService } from '../../services/shared-data.service';
import { TypesService } from '../../services/types.service';
import { CategoryService } from '../../services/category.service';
import { UtilsFunction } from '../../utils-function';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  tableColumns = ['no', 'name', 'cat_image', 'actions', 'category_detail', 'down_arrow'];
  categoriesData = [];
  loading = true;
  constructor(
    private categoryService: CategoryService,
    private typeSerive: TypesService,
    private modalService: NgbModal,
    private utils: UtilsFunction,
    private data: SharedDataService,
    private SpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getPriceTypes();
    this.getOptionsType();
  }

  getCategories() {
    this.loading = true;
    this.SpinnerService.show();
    this.categoryService.getCategories().subscribe(res => {
      this.categoriesData = res.results;
      this.SpinnerService.hide();
      this.loading = false;
    });
  }

  openModal(type) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = type === 'register' ? 'lg' : '';
    modalOptions.windowClass = type + '-modal';

    const modalRef = this.modalService.open(ModalAddCategoryComponent, modalOptions);
    modalRef.componentInstance.modalType = type;
    modalRef.componentInstance.categories = this.categoriesData;
  }

  categoryEventClicked(data) {
    if ( data.type === 'delete') {
      this.categoryService.deleteCategory(data.record).subscribe(res => {
      });
    }
  }

  getPriceTypes() {
    this.typeSerive.getPriceTypes().subscribe(res => {
      this.data.getPriceType(res.types);
    });
  }

  getOptionsType() {
    this.typeSerive.getOptionsTypes().subscribe(res => {
      this.data.getOptionType(res.types);
    });
  }

}
