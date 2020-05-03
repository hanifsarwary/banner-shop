import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customerForm: FormGroup;
  validateFlag = false;
  submitted = false;


  constructor(private fb: FormBuilder,
    private orderServeice: OrderService,
    private toast: ToastrService) {

    this.customerForm = this.fb.group({
      approach_details: ['', Validators.required],
      bussiness_type: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      company_name: ['', Validators.required],
      country: ['', Validators.required],
      fax_number: ['', Validators.required],
      phone_number: ['', [Validators.required, Validators.minLength(8),
                          Validators.maxLength(20), Validators.pattern('^[+0-9][-(-)0-9.]*$')]],
      zip_code: ['', Validators.required],
      second_email: ['', Validators.compose([
                         Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      third_email: ['', Validators.compose([
                        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      user: this.fb.group({
        username: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        email: ['', Validators.compose([Validators.required,
                    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
        password: ['', Validators.required]
      })
    });
   }

  ngOnInit(): void {
  }

  onSubmit(obj) {
    this.submitted = true;
    if (this.customerForm.valid) {
      this.validateFlag = false;
      this.submitted = false;
      this.orderServeice.addCustomers(obj.value).subscribe(res => {
        this.toast.success('Customer added successfully!', '');
        this.customerForm.reset();
      });
    } else {
      this.validateFlag = true;
    }
  }

}
