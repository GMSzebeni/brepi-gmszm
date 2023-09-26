import { Component, OnInit } from '@angular/core';
import { BeersDataService } from '../beers-data.service';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.less']
})
export class BeersComponent implements OnInit{
  beers: any[] = [];
  pages: number[] = [];
  currentPage = 1;
  itemsPerPage = 6;

  constructor(private beersDataService: BeersDataService) {}

  ngOnInit(): void {
    this.loadBeers();
  }

  loadBeers(): void {
    this.beersDataService
      .getBeers(this.currentPage, this.itemsPerPage)
        .subscribe(data => {
          this.beers = data;
          this.pages = [
            this.currentPage, 
            this.currentPage + 1, 
            this.currentPage + 2, 
            this.currentPage + 3, 
            this.currentPage + 4
          ];
          this.beers.forEach(beer => (beer.showDescription = false));
        });
  }

  toggleDescription(beer : any): void {
    beer.showDescription = !beer.showDescription;
    this.beers.forEach(otherBeer => {
      if (otherBeer !== beer) {
        otherBeer.showDescription = false;
      }
    })
  }

  firstPage(): void {
    this.currentPage -= this.currentPage - 1;
    this.loadBeers();
  }

  nextPage(): void {
    if (this.currentPage < 55) {
      this.currentPage++;
      this.loadBeers();
    }
  }

  toPage(page: number): void {
    this.currentPage += page - this.currentPage;
    this.loadBeers();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBeers();
    }
  }

  lastPage(): void {
    this.currentPage += 55 - this.currentPage;
    this.loadBeers();
  }
}