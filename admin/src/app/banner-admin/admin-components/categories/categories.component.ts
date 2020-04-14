import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalAddCategoryComponent } from '../sub-components/modal-add-category/modal-add-category.component';
import { SharedDataService } from '../../services/shared-data.service';
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
    private apiService: ApiService,
    private modalService: NgbModal,
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
    this.apiService.getCategories().subscribe(res => {
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
      this.apiService.deleteCategory(data.record).subscribe(res => {
      });
    }
  }

  getPriceTypes() {
    this.apiService.getPriceTypes().subscribe(res => {
      this.data.getPriceType(res.types);
    });
  }

  getOptionsType() {
    this.apiService.getOptionsTypes().subscribe(res => {
      this.data.getOptionType(res.types);
    });
  }
}
