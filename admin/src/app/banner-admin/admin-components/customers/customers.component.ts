import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customerForm: FormGroup;


  constructor(private fb: FormBuilder,
    private apiServeice: ApiService,
    private toast: ToastrService) {

    this.customerForm = this.fb.group({
      approach_details: [''],
      bussiness_type: [''],
      address: [''],
      city: [''],
      company_name: [''],
      country: [''],
      fax_number: [''],
      phone_number: [''],
      zip_code: [''],
      user: this.fb.group({
        username: [''],
        first_name: [''],
        last_name: [''],
        email: [''],
        password: ['']
      })
    });
   }

  ngOnInit(): void {
  }

  onSubmit(obj) {
    this.apiServeice.addCustomers(obj.value).subscribe(res => {
      this.toast.success('Customer added successfully!', '');
      this.customerForm.reset();
    });
  }

}
