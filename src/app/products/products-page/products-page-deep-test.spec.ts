import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsPage } from './products-page';
import { Subject } from 'rxjs';
import { Product } from '../shared/product';
import { DebugElement, getNgModuleById } from '@angular/core';
import { MockComponent, MockProvider } from 'ng-mocks';
import { ProductsService } from '../products-service';
import { By } from '@angular/platform-browser';
import { ProductsOverview } from '../products-overview/products-overview';
import { createProductMock } from '../shared/product.mock';

const EXAMPLE_PRODUCTS = [
  createProductMock({id: 1, title: "Product #1", rating: {count: 15, rate: 4}}),
  createProductMock({id: 2, title: "Second Product"})
]

describe('ProductsPage Deep', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  const getProducts$ = new Subject<Product[]>();

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ProductsPage],
      providers: [
        MockProvider(ProductsService, {
          get: () => getProducts$
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    getProducts$.next(EXAMPLE_PRODUCTS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render all titles in anchor elements', () => {
    const anchors = fixture.debugElement.queryAll(By.css('a'));
    const anchorTexts = anchors
      .map(elem => elem.nativeElement as HTMLAnchorElement)
      .map(anchor => anchor.innerHTML);
    

    expect(anchorTexts).toEqual(jasmine.arrayContaining(['Product #1', 'Second Product']))
  });

  it('Should render stars correctly', () => {
    const starRating = fixture.debugElement.queryAll(By.css('ov-star-rating'));
    
    expect(starRating).toHaveSize(2);

    expectStarRating(starRating[0], 4, 1);
    expectStarRating(starRating[1], 5, 0);
  });
});

function expectStarRating(ratingElement: DebugElement, expectedFullStars: number, expectedEmptyStars: number) {
  const fullStars = ratingElement.queryAll(By.css('.star.fa.fa-star'));
  expect(fullStars).toHaveSize(expectedFullStars);

  const emptyStars = ratingElement.queryAll(By.css('.star.fa.fa-star-o'));
  expect(emptyStars).toHaveSize(expectedEmptyStars);
}

