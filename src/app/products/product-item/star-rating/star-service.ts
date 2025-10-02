import { Injectable } from '@angular/core';
import { Star } from './star-rating';

@Injectable({
  providedIn: 'root'
})
export class StarService {
  ratingToStars(rating: number): Star[] {
    const stars: Star[] = [];

    for(var i = 1; i <= 5; i++) {
      const diff = rating - i;
      if (diff >= 0) {
        stars.push(1);
      } else if (diff < 0 && diff > -1) {
        if(diff >= -0.25) {
          stars.push(1);
        } else {
          stars.push(0.5);
        }
      } else {
        stars.push(0);
      }
    }

    return stars;
  }
  
}
