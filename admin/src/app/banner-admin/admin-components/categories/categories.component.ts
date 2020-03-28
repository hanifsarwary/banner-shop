import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddCategoryComponent } from '../sub-components/modal-add-category/modal-add-category.component';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  tableColumns = ['no', 'name', 'cat_image', 'actions' ];
  categoriesData = [];
  categoriesDatas = [
    {
      year: 2020,
      market: 'Lahore',
      share: '30%',
    },
    {
      year: 2021,
      market: 'Faisalabad',
      share: '30%',
    },
    {
      year: 2022,
      market: 'Karchi',
      share: '30%',
    },
    {
      year: 2023,
      market: 'Gujranwala',
      share: '30%',
    }
    ,
    {
      year: 2023,
      market: 'Gujranwala',
      share: '30%',
    }
    ,
    {
      year: 2023,
      market: 'Gujranwala',
      share: '30%',
    }
    ,
    {
      year: 2023,
      market: 'Gujranwala',
      share: '30%',
    }
  ];
  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.apiService.getCategories().subscribe(res => {
      this.categoriesData = res.results;
    });
  }

  openModal(type) {
    const modalOptions = { size: '', windowClass: ''};
    modalOptions.size = type === 'register' ? 'lg' : '';
    modalOptions.windowClass = type + '-modal';

    const modalRef = this.modalService.open(ModalAddCategoryComponent, modalOptions);
    modalRef.componentInstance.modalType = type;
    modalRef.componentInstance.categories = this.categoriesData;
  }

  categoryEventClicked(data) {
    if ( data.type === 'delete') {
      this.apiService.deleteCategory(data.record).subscribe(res => {
        console.log('delete successfulllllllll');
      });
    }
  }
}
