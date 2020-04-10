import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OptionModelComponent } from './option-model/option-model.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-option-groups',
  templateUrl: './option-groups.component.html',
  styleUrls: ['./option-groups.component.css']
})
export class OptionGroupsComponent implements OnInit {
  tableColumns = ['no', 'option_name', 'option_type'];
  optionsData = [];
  productData = [];
  pricesData = [];
  loading = true;
  constructor(private apiService: ApiService,
    private SpinnerService: NgxSpinnerService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getOptions();
    this.getOptionsType();
    this.getProducts();
  }


  openModal(type) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = type === 'register' ? 'lg' : '';
    modalOptions.windowClass = type + '-modal';

    const modalRef = this.modalService.open(OptionModelComponent, modalOptions);
    modalRef.componentInstance.modalType = type;
    modalRef.componentInstance.products = this.productData;
  }

  getOptionsType() {
    this.apiService.getOptionsTypes().subscribe(res => {
      localStorage.setItem('OptionPriceObj', JSON.stringify(res.types));
      this.pricesData = res.types;
    });
  }

  getOptions() {
    this.loading = true;
    this.SpinnerService.show();
    this.optionsData = [];
    this.apiService.getOptions().subscribe(res => {
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
    this.apiService.getOptionsByProduct(param).subscribe(res => {
      this.optionsData = res;
      this.SpinnerService.hide();
      this.loading = false;
    });
  }

  getProducts() {
    this.apiService.getProducts().subscribe(res => {
      this.productData = res.results;
    });
  }

}
