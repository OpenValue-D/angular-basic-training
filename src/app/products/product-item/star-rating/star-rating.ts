import { Component, ElementRef, inject, input, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { StarService } from './star-service';

export type Star = 0 | 0.5| 1;

const STAR_CLASSES: Record<Star, string> = {
  '0': 'star fa fa-star-o',
  '0.5': 'star fa fa-star-half-o',
  '1': 'star fa fa-star',
};

@Component({
  selector: 'ov-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrl: './star-rating.scss'
})
export class StarRating {
  private starService = inject(StarService);

  starCount = input(0)
  reviewCount = input(0);

  @ViewChild('stars')
  starsElement!: ElementRef;

  ngAfterViewInit() {
    const stars: Star[] = this.starService.ratingToStars(this.starCount());

    stars.forEach((star) => {
      const starElement = document.createElement('span');
      starElement.className = STAR_CLASSES[star];
      this.starsElement.nativeElement.appendChild(starElement);
    });
  }
}