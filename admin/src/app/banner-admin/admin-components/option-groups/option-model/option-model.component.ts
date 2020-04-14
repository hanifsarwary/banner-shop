import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-option-model',
  templateUrl: './option-model.component.html',
  styleUrls: ['./option-model.component.css']
})
export class OptionModelComponent implements OnInit {

  @Input() products;
  public optionForm: FormGroup;
  calculatedPrice = 75;
  isChild = false;
  priceType: string;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.optionForm = this.fb.group({
      option_name: ['', [Validators.minLength(3), Validators.required]],
      product: ['', [Validators.minLength(3), Validators.required]],
    });
  }

  submitForm(): void {
    this.optionForm.reset();
    this.activeModal.close();
    this.toast.success('Option added successfully!', '');
  }

}
