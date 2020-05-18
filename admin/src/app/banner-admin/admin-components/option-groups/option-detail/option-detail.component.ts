import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { SharedDataService } from 'src/app/banner-admin/services/shared-data.service';
import { UtilsFunction } from 'src/app/banner-admin/utils-function';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OptionService } from 'src/app/banner-admin/services/option.service';

@Component({
  selector: 'app-option-detail',
  templateUrl: './option-detail.component.html',
  styleUrls: ['./option-detail.component.scss']
})
export class OptionDetailComponent implements OnInit {

  optionId: number;
  optionDetail = [];
  optionsData = [];
  dynamicArray = [];
  ids = [];
  currentIdFlag = true;
  currentId: number;
  newDynamic: any = {};
  editOptionId = false;
  subOptionId = false;
  loading = true;
  optionLoading = false;

  constructor(
    private route: ActivatedRoute,
    private optionService: OptionService,
    private sharedData: SharedDataService,
    private utils: UtilsFunction,
    private SpinnerService: NgxSpinnerService,
    private toast: ToastrService) {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.optionId = params['id'];
        this.getOptionDetail(this.optionId);
        this.getSubOption(this.optionId);
      }
    });
   }

  ngOnInit(): void {
    this.newDynamic = {name: '', price: ''};
    this.dynamicArray.push(this.newDynamic);
  }

  editOption() {
    this.editOptionId = true;
  }

  saveOption(obj) {
    this.optionService.updateOptions(obj['id'], obj).subscribe(res => {
      this.editOptionId = false;
      this.toast.success('Option updated successfully!', '');
    });
  }

  getSubOption(id) {
    this.optionService.getSubOption(id).subscribe(res => {
      this.dynamicArray = res;
      this.optionLoading = true;
    });
  }

  editSubOption(id) {
    this.subOptionId = id;
  }

  saveSubOption(obj) {
    this.optionService.updateSubOption(obj['id'], obj).subscribe(res => {
      this.subOptionId = null;
      this.toast.success('Sub option updated successfully!', '');
    });
  }

  getOptionDetail(id) {
    this.loading = true;
    this.SpinnerService.show();
    this.optionService.getOptions(id).subscribe(res => {
      this.optionDetail = res;
      this.sharedData.optionTypes.subscribe(message => {
        this.optionsData = message;
        this.loading = false;
      });
      this.SpinnerService.hide();
    });
  }

  addSubOption(id, obj) {
    this.optionService.addSubOption(id, obj).subscribe(res => {
      this.currentId = null;
      this.currentIdFlag = true;
      this.toast.success('Sub option added successfully!', '');
    });
  }

  addRow() {
    this.newDynamic = {name: '', price: ''};
    this.dynamicArray.push(this.newDynamic);
    this.currentIdFlag = false;
    this.currentId = this.dynamicArray.length;
    return true;
  }

  deleteRow(index) {
    this.currentId = null;
    this.currentIdFlag = true;
    if (this.dynamicArray.length === 1) {
        return false;
    } else {
        this.dynamicArray.splice(index, 1);
        return true;
    }
  }

}
