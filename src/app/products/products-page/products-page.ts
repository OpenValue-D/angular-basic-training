import { Component, inject } from '@angular/core';
import { ProductSearch } from "../product-search/product-search";
import { ProductsOverview } from "../products-overview/products-overview";
import { ProductsFilterPipe } from "../shared/products-filter-pipe";
import { ProductsService } from '../products-service';
import { Observable, of, startWith } from 'rxjs';
import { Product } from '../shared/product';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'ov-products-page',
  imports: [ProductSearch, ProductsOverview, ProductsFilterPipe, AsyncPipe],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss'
})
export class ProductsPage {
  private productService = inject(ProductsService);

  searchTerm = ''

  products$: Observable<Product[]> = of([] as Product[])

  constructor() {  
    this.products$ = this.productService.get().pipe(
      startWith([] as Product[])
    );
  }

  updateSearchTerm(newSearchTerm: string) {
    this.searchTerm = newSearchTerm;
  }
}
