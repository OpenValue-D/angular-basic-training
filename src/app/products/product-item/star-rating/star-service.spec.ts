import { TestBed } from '@angular/core/testing';

import { StarService } from './star-service';
import { Star } from './star-rating';

describe('StarService', () => {
  let service: StarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all 0 stars for 0 rating', () => {
    const stars: Star[] = service.ratingToStars(0);
    expect(stars).toEqual([0,0,0,0,0])
  });

  it('should return all 5 full stars for 5 rating', () => {
    const stars: Star[] = service.ratingToStars(5);
    expect(stars).toEqual([1,1,1,1,1])
  });

  it('should return 3 full and one half stars for 3.5 rating', () => {
    const stars: Star[] = service.ratingToStars(3.5);
    expect(stars).toEqual([1,1,1,0.5, 0])
  });

  it('should return 3 full and one half stars for 3.74999 rating', () => {
    const stars: Star[] = service.ratingToStars(3.74999);
    expect(stars).toEqual([1,1,1,0.5, 0])
  });

  it('should return 4 full stars for 3.75 rating', () => {
    const stars: Star[] = service.ratingToStars(3.75);
    expect(stars).toEqual([1,1,1,1, 0])
  });
});
