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

  constructor(private apiService: ApiService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.apiService.getProducts().subscribe(res => {
      this.productsData = res.results;
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

  getCategories() {
    this.apiService.getCategories().subscribe(res => {
      this.categoriesData = res.results;
    });
  }

}
