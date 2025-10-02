import { Component, input } from '@angular/core';
import { Product } from '../shared/product';
import { StarRating } from "./star-rating/star-rating";
import { SquareImage } from "./square-image/square-image";

@Component({
  selector: 'ov-product-item',
  imports: [StarRating, SquareImage],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss',
})
export class ProductItem {
  product = input.required<Product>();
}
 