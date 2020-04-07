import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OptionModelComponent } from './option-model/option-model.component';

@Component({
  selector: 'app-option-groups',
  templateUrl: './option-groups.component.html',
  styleUrls: ['./option-groups.component.css']
})
export class OptionGroupsComponent implements OnInit {
  tableColumns = ['no', 'option_name', 'price_unit', 'option_description', 'option_type' ];
  optionsData = [];
  productData = [];
  constructor(private apiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getOptions();
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

  getOptions() {
    this.apiService.getOptions().subscribe(res => {
      console.log(res);
      this.optionsData = res.results;
    });
  }

  getProducts() {
    this.apiService.getProducts().subscribe(res => {
      this.productData = res.results;
    });
  }

}
