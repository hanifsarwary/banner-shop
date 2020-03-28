import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/banner-admin/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-add-category',
  templateUrl: './modal-add-category.component.html',
  styleUrls: ['./modal-add-category.component.scss']
})
export class ModalAddCategoryComponent implements OnInit {
  @Input() categories;
  public categoryForm: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.minLength(3), Validators.required]],
      parent_category: ['']
    });
  }

  get contactControls() {
    return this.categoryForm.get('category')['controls'];
  }

  submitForm(): void {
    const formValues = this.categoryForm.value;

    this.apiService.addCategory(formValues).subscribe(res => {
      this.categoryForm.reset();
      this.activeModal.close();
      this.toast.success('Category added successfully!', '');
    });
  }
}
