import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModelComponent } from './product-model/product-model.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  tableColumns = ['no', 'product_name', 'product_image', 'product_detail' ];
  productsData = [];
  categoriesData = [];
  optionsData = [];
  showFilter = false;
  notRecordFound = false;

  constructor(private apiService: ApiService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getOptions();
  }

  getProducts() {
    this.productsData = [];
    this.apiService.getProducts().subscribe(res => {
      this.productsData = res.results;
    });
  }

  getProductsByCategory(param?) {
    this.productsData = [];
    this.apiService.getProductsByCategory(param).subscribe(res => {
        this.productsData = res;
    });
  }

  openModal(type) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = type === 'register' ? 'lg' : '';
    modalOptions.windowClass = type + '-modal';

    const modalRef = this.modalService.open(ProductModelComponent, modalOptions);
    modalRef.componentInstance.modalType = type;
    modalRef.componentInstance.categories = this.categoriesData;
  }

  deleteProduct(data) {
    if ( data.type === 'delete') {
      this.apiService.deleteProduct(data.record).subscribe(res => {
      });
    }
  }
  showFilters() {
    this.showFilter = true;
  }

  showByCategoryId(id) {
    if (id === 'all') {
      this.getProducts();
    } else {
      this.getProductsByCategory(id);
    }
  }
  showByOptionId(id) {
    if (id === 'all') {
      this.getProducts();
    } else {
      this.getProductsByOption(id);
    }
  }

  getProductsByOption(param?) {

  }

  getOptions() {
    this.apiService.getOptions().subscribe(res => {
      this.optionsData = res.results;
    });
  }

  getCategories() {
    this.apiService.getCategories().subscribe(res => {
      this.categoriesData = res.results;
    });
  }

}
