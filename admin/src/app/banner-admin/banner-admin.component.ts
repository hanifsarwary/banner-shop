import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { SharedDataService } from './services/shared-data.service';
import { TypesService } from './services/types.service';

@Component({
  selector: 'app-banner-admin',
  templateUrl: './banner-admin.component.html',
  styleUrls: ['./banner-admin.component.scss']
})
export class BannerAdminComponent implements OnInit {

  collapedSideBar = true;
  message: any;

  constructor(
    private apiService: ApiService,
    private typeSerive: TypesService,
    private data: SharedDataService) { }

  ngOnInit(): void {
    this.getPriceTypes();
    this.getOptionsType();
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }

  getPriceTypes() {
    this.typeSerive.getPriceTypes().subscribe(res => {
      this.data.getPriceType(res.types);
    });
  }

  getOptionsType() {
    this.typeSerive.getOptionsTypes().subscribe(res => {
      this.data.getOptionType(res.types);
    });
  }
}
