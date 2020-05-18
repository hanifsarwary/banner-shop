import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/banner-admin/services/shared-data.service';
import { OptionService } from 'src/app/banner-admin/services/option.service';

@Component({
  selector: 'app-option-model',
  templateUrl: './option-model.component.html',
  styleUrls: ['./option-model.component.css']
})
export class OptionModelComponent implements OnInit {

  @Input() products;
  public optionForm: FormGroup;
  calculatedPrice = 75;
  optionsData = [];
  isChild = false;
  priceType: string;
  productId;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private sharedData: SharedDataService,
    private optionService: OptionService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.optionForm = this.fb.group({
      option_name: ['', Validators.required],
      option_type: ['', Validators.required],
      option_description: [''],
      is_suboptions: [''],
      product: ['', Validators.required],
    });
    this.sharedData.optionTypes.subscribe(message => {
      this.optionsData = message;
    });
  }

  submitForm(): void {
    this.productId = this.optionForm.value.product;
    this.optionService.addSubOptionByProduct(this.productId, this.optionForm.value).subscribe(res => {
      this.toast.success('Option added successfully!', '');
      window.location.reload();
    });
  }

}
