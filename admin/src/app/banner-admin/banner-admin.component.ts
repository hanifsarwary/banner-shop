import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-banner-admin',
  templateUrl: './banner-admin.component.html',
  styleUrls: ['./banner-admin.component.scss']
})
export class BannerAdminComponent implements OnInit {

  collapedSideBar: boolean;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  getPriceTypes() {
    this.apiService.getPriceTypes().subscribe(res => {
      localStorage.setItem('priceObj', JSON.stringify(res.types));
    });
  }

  getOptionsType() {
    this.apiService.getOptionsTypes().subscribe(res => {
      localStorage.setItem('OptionPriceObj', JSON.stringify(res.types));
    });
  }
}
