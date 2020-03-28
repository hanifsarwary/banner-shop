import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner-admin',
  templateUrl: './banner-admin.component.html',
  styleUrls: ['./banner-admin.component.scss']
})
export class BannerAdminComponent implements OnInit {

  collapedSideBar: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
