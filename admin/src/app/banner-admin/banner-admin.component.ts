import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { SharedDataService } from './services/shared-data.service';

@Component({
  selector: 'app-banner-admin',
  templateUrl: './banner-admin.component.html',
  styleUrls: ['./banner-admin.component.scss']
})
export class BannerAdminComponent implements OnInit {

  collapedSideBar: boolean;
  message: any;

  constructor(private apiService: ApiService, private data: SharedDataService) { }

  ngOnInit(): void {
    this.getPriceTypes();
    this.getOptionsType();
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
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
