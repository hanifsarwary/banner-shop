import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DatatableComponent implements OnChanges {

  constructor(private apiService: ApiService) { }
  @Output() categoryItemEvent = new EventEmitter();
  @Input() datatableColumns: [];
  @Input() dataSource: [];
  @Input() optionExpand = false;
  @Input() productExpand = false;
  @Input() categoryExpand = false;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  sourceData;
  expandedElement: null;
  detailObj = [];
  subCategoryDetail = [];
  optionLoading = false;
  noOption = false;
  currentId = false;

  ngOnChanges() {
    this.sourceData = new MatTableDataSource(this.dataSource);
    this.sourceData.sort = this.sort;
    this.sourceData.paginator = this.paginator;
  }

  categoryEvent(type, entryId) {
    const data = {
      type: type,
      record: entryId
    };
    this.categoryItemEvent.emit(data);
  }

  expandDetail(id) {
    this.currentId = id;
    this.detailObj = [];
    this.optionLoading = false;
    this.noOption = false;
    if (this.optionExpand) {
      this.apiService.getSubOption(id).subscribe(res => {
        this.detailObj = res;
        if (this.detailObj.length) {
          this.detailObj = res;
          this.optionLoading = true;
        } else {
          this.optionLoading = true;
          this.noOption = true;
        }});
    } else if (this.productExpand) {
      this.apiService.getProducts(id).subscribe(res => {
        this.detailObj = res;
        if (this.detailObj.length) {
          this.optionLoading = true;
        } else {
          this.optionLoading = true;
          this.noOption = true;
        }
      });
    } else if (this.categoryExpand) {
      this.apiService.getSubCategory(id).subscribe(res => {
        this.detailObj = res;
        if (this.detailObj.length) {
          this.detailObj = res;
          this.optionLoading = true;
        } else {
          this.optionLoading = true;
          this.noOption = true;
        }
      });
    }
  }
}
