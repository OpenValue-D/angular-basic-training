import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'ov-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss'
})
export class StarRating {
  starCount = input(0)
  reviewCount = input(0);
}
