import { Component, inject, signal } from '@angular/core';
import { ProductSearch } from "../product-search/product-search";
import { ProductsOverview } from "../products-overview/products-overview";
import { ProductsFilterPipe } from "../shared/products-filter-pipe";
import { ProductsService } from '../products-service';
import { Observable, of, startWith, tap } from 'rxjs';
import { Product } from '../shared/product';

@Component({
  selector: 'ov-products-page',
  imports: [ProductSearch, ProductsOverview, ProductsFilterPipe],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss'
})
export class ProductsPage {
  private productService = inject(ProductsService);
  products = signal<Product[]>([]);

  searchTerm = ''

  constructor() {  
    this.updateProducts();
  }

  private updateProducts() {
    this.productService.get(this.searchTerm).subscribe({
      next: (value) => this.products.set(value),
      error: (err) => console.log("Error when fetching products.", err),
    });
  }

  updateSearchTerm(newSearchTerm: string) {
    this.searchTerm = newSearchTerm;
    this.updateProducts();
  }
}
