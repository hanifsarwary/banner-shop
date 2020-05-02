import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductModelComponent } from './product-model/product-model.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../services/shared-data.service';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  tableColumns = ['no', 'product_name', 'product_image', 'product_price_type', 'product_detail', 'down_arrow' ];
  productsData = [];
  categoriesData = [];
  pricesData = [];
  optionsData = [];
  showFilter = false;
  notRecordFound = false;
  loading = true;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private sharedDate: SharedDataService,
    private modalService: NgbModal,
    private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {

    this.sharedDate.priceTypes.subscribe(message => {
      this.pricesData = message;
    });
    this.sharedDate.optionTypes.subscribe(message => {
      this.optionsData = message;
    });
    this.getProducts();
    this.getCategories();
  }

  getProducts(param?) {
    this.loading = true;
    this.SpinnerService.show();
    this.productsData = [];
    this.productService.getProducts(param).subscribe(res => {
      this.productsData = res.results;
      this.SpinnerService.hide();
      this.loading = false;
    });
  }

  getProductsByCategory(param?) {
    this.loading = true;
    this.SpinnerService.show();
    this.productsData = [];
    this.productService.getProductsByCategory(param).subscribe(res => {
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
    modalRef.componentInstance.priceTypes = this.pricesData;
  }

  deleteProduct(data) {
    if ( data.type === 'delete') {
      this.productService.deleteProduct(data.record).subscribe(res => {
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

  getCategories() {
    this.categoryService.getCategories().subscribe(res => {
      this.categoriesData = res.results;
    });
  }

}
