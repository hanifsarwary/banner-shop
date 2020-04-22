import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-filters-bar',
  templateUrl: './filters-bar.component.html',
  styleUrls: ['./filters-bar.component.scss'],
  providers: [DatePipe]
})
export class FiltersBarComponent implements OnInit {

  maxDate = new Date();
  minDate = new Date();
  showCalender = false;

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  inlineRangeChange($event) {
    const start = this.datePipe.transform($event.begin, 'yyyy-MM-dd');
    const end = this.datePipe.transform($event.end, 'yyyy-MM-dd');
  }

  showDate() {
    this.showCalender = true;
  }

}
