import { Component, input } from '@angular/core';
import { ProductItem } from '../product-item/product-item';
import { Product } from '../shared/product';

@Component({
  selector: 'ov-products-overview',
  imports: [ProductItem],
  templateUrl: './products-overview.html',
  styleUrl: './products-overview.scss',
})
export class ProductsOverview {

  products = input.required<Product[]>()

}
