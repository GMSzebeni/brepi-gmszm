import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BeersDataService {
    private url: string = 'https://api.punkapi.com/v2/beers';

    constructor() { }

    getBeers(page: number, perPage: number): Observable<any> {
        const url = `${this.url}?page=${page}&per_page=${perPage}`;
        return new Observable(observer => {
            fetch(url)
                .then(this.handleErrors)
                .then(data => {
                    observer.next(data);
                    observer.complete();
                })
                .catch(error => {
                    observer.error(error);
                });
        });
    }

    handleErrors(response: any) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json();
    }
}