import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './shared/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  get(searchString: string): Observable<Product[]> {
    const queryString = (searchString != null && searchString != '') ? '?filter=' + searchString : '';

    return this.http.get<Product[]>('https://fakestoreapi.com/products' + queryString);
  }
}
