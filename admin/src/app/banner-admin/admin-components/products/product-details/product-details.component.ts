import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/banner-admin/services/api.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;
  productDetail: any;
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = params['id'];
        this.getProductDetail(this.productId);
      }
    });
   }

  ngOnInit() {}

  getProductDetail(productId) {
    this.apiService.getProducts(productId).subscribe( res => {
      this.productDetail = res;
    });
  }

}
