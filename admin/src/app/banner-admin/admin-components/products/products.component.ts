import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModelComponent } from './product-model/product-model.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  tableColumns = ['no', 'product_name', 'product_image', 'product_price_type', 'product_detail' ];
  productsData = [];
  categoriesData = [];
  pricesData = [];
  optionsData = [];
  showFilter = false;
  notRecordFound = false;
  loading = true;

  constructor(private apiService: ApiService,
    private modalService: NgbModal, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPriceTypes();
    this.getProducts();
    this.getCategories();
    this.getOptions();
  }

  getPriceTypes() {
    this.apiService.getPriceTypes().subscribe(res => {
      localStorage.setItem('priceObj', JSON.stringify(res.types));
      this.pricesData = res.types;
    });
  }

  getProducts(param?) {
    this.loading = true;
    this.SpinnerService.show();
    this.productsData = [];
    this.apiService.getProducts(param).subscribe(res => {
      this.productsData = res.results;
      this.SpinnerService.hide();
      this.loading = false;
    });
  }

  getProductsByCategory(param?) {
    this.loading = true;
    this.SpinnerService.show();
    this.productsData = [];
    this.apiService.getProductsByCategory(param).subscribe(res => {
        this.productsData = res;
        this.SpinnerService.hide();
        this.loading = false;
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
  showByPriceType(id) {
    const param = `?price_type=${id}`;
    if (id === 'all') {
      this.getProducts();
    } else {
      this.getProducts(param);
    }
  }
  showByFeatured(value) {
    const param = `?${value}=${true}`;
    if (value === 'all') {
      this.getProducts();
    } else {
      this.getProducts(param);
    }
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
