import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OptionModelComponent } from './option-model/option-model.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedDataService } from '../../services/shared-data.service';
import { ProductService } from '../../services/product.service';
import { OptionService } from '../../services/option.service';

@Component({
  selector: 'app-option-groups',
  templateUrl: './option-groups.component.html',
  styleUrls: ['./option-groups.component.css']
})
export class OptionGroupsComponent implements OnInit {
  tableColumns = ['no', 'option_name', 'option_type', 'option_detail', 'down_arrow'];
  optionsData = [];
  productData = [];
  pricesData = [];
  loading = true;
  constructor(
    private productService: ProductService,
    private optionService: OptionService,
    private SpinnerService: NgxSpinnerService,
    private modalService: NgbModal,
    private sharedData: SharedDataService) { }

  ngOnInit(): void {
    this.getOptions();
    this.getProducts();
    this.sharedData.optionTypes.subscribe(message => {
      this.optionsData = message;
    });
  }


  openModal(type) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = type === 'register' ? 'lg' : '';
    modalOptions.windowClass = type + '-modal';

    const modalRef = this.modalService.open(OptionModelComponent, modalOptions);
    modalRef.componentInstance.modalType = type;
    modalRef.componentInstance.products = this.productData;
  }

  getOptions() {
    this.loading = true;
    this.SpinnerService.show();
    this.optionsData = [];
    this.optionService.getOptions().subscribe(res => {
      this.optionsData = res.results;
      this.SpinnerService.hide();
    });
  }

  showByProducrId(id) {
    const param = `${id}/options/`;
    if (id === 'all') {
      this.getOptions();
    } else {
      this.getOptionByProdcuct(param);
    }
  }

  getOptionByProdcuct(param?) {
    this.optionsData = [];
    this.loading = true;
    this.SpinnerService.show();
    this.productService.getOptionsByProduct(param).subscribe(res => {
      this.optionsData = res;
      this.SpinnerService.hide();
      this.loading = false;
    });
  }

  getProducts() {
    this.productService.getProducts().subscribe(res => {
      this.productData = res.results;
    });
  }

}
