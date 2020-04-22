import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customerForm: FormGroup;
  userList = [];

  constructor(private fb: FormBuilder, private apiServeice: ApiService,
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
      user: [''],
    });
   }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiServeice.getUsers().subscribe(res => {
      this.userList = res.results;
    });
  }

  onSubmit(obj) {
    this.apiServeice.addCustomers(obj.value).subscribe(res => {
      this.toast.success('Customer added successfully!', '');
      this.customerForm.reset();
    });
  }

}
