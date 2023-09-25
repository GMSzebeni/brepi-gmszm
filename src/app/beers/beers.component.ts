import { Component, OnInit } from '@angular/core';
import { BeersDataService } from '../beers-data.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.less']
})
export class BeersComponent implements OnInit{
  beers: any[] = [];
  currentPage = 1;
  itemsPerPage = 6;
  status: string = 'loading';

  constructor(private beersDataService: BeersDataService) {}

  ngOnInit(): void {
    this.loadBeers();
  }

  loadBeers(): void {
    this.beersDataService
      .getBeers(this.currentPage, this.itemsPerPage)
        .subscribe(data => {
          this.beers = data;
        });
  }

  nextPage(): void {
    if (this.currentPage < 55) {
      this.currentPage++;
      this.loadBeers();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBeers();
    }
  }
}
