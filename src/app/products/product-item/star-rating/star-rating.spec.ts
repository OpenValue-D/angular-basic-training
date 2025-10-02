import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Star, StarRating } from './star-rating';
import { MockProvider } from 'ng-mocks';
import { StarService } from './star-service';
import { By } from '@angular/platform-browser';

describe('StarRating', () => {
  let component: StarRating;
  let fixture: ComponentFixture<StarRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarRating],
      providers: [MockProvider(StarService)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarRating);
    component = fixture.componentInstance;

    // IMPORTANT: Do not call fixture.detectChanges() here as it will already trigger the change detection
    // and the AfterViewInit hook.
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should render a bad rating', () => {
    const starService = TestBed.inject(StarService);
    spyOn(starService, 'ratingToStars').and.returnValue([0, 0, 0, 0, 0]);

    fixture.detectChanges();

    const emptyStars = fixture.debugElement.queryAll(By.css('.fa-star-o'));

    expect(emptyStars.length).toBe(5);
  });

  it('should render a great rating', () => {
    const starService = TestBed.inject(StarService);
    spyOn(starService, 'ratingToStars').and.returnValue([1, 1, 1, 1, 1]);

    fixture.detectChanges();

    const fullStars = fixture.debugElement.queryAll(By.css('.fa-star'));

    expect(fullStars.length).toBe(5);
  });

  it('should render a mediocre rating', () => {
    const starService = TestBed.inject(StarService);
    spyOn(starService, 'ratingToStars').and.returnValue([1, 1, 0.5, 0, 0]);

    fixture.detectChanges();

    const fullStars = fixture.debugElement.queryAll(By.css('.fa-star'));
    const halfStars =fixture.debugElement.queryAll(By.css('.fa-star-half-o'));
    const emptyStars = fixture.debugElement.queryAll(By.css('.fa-star-o'));

    expect(fullStars.length).toBe(2);
    expect(halfStars.length).toBe(1);
    expect(emptyStars.length).toBe(2);
  });
});

