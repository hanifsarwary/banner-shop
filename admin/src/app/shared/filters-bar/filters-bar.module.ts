import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersBarComponent } from './filters-bar.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FiltersBarComponent],
  exports: [FiltersBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatSelectModule
  ]
})
export class FiltersBarModule { }
