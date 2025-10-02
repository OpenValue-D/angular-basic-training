import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductItem } from './product-item';
import { MockComponents } from 'ng-mocks';
import { StarRating } from './star-rating/star-rating';
import { SquareImage } from './square-image/square-image';
import { createProductMock } from '../shared/product.mock';
import { input } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProductItem', () => {
  let component: ProductItem;
  let fixture: ComponentFixture<ProductItem>;

  const mockProduct = createProductMock();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductItem, ...MockComponents(StarRating, SquareImage)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductItem);
    component = fixture.componentInstance;
  
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product title, category, description and price', () => {
    const title = fixture.nativeElement.querySelector('.title');
    expect(title.textContent).toContain(mockProduct.title);

    const category = fixture.nativeElement.querySelector('.category');
    expect(category.textContent).toContain(mockProduct.category);

    const description = fixture.nativeElement.querySelector('.description');
    expect(description.textContent).toContain(mockProduct.description);

    const price = fixture.nativeElement.querySelector('.price');
    expect(price.textContent).toContain(mockProduct.price);
  });

  it('should render a rating', () => {
    const ratingComponents = fixture.debugElement.queryAll(
      By.directive(StarRating)
    );

    expect(ratingComponents.length).toBe(1);

    expect(ratingComponents[0].componentInstance.starCount).toEqual(mockProduct.rating.rate);
    expect(ratingComponents[0].componentInstance.reviewCount).toEqual(mockProduct.rating.count);
  });

  it('should render a square image with src and alt', () => {
    const imageComponents = fixture.debugElement.queryAll(
      By.directive(SquareImage)
    );

    expect(imageComponents.length).toBe(1);

    expect(imageComponents[0].componentInstance.src).toEqual(mockProduct.image);
    expect(imageComponents[0].componentInstance.alt).toEqual(mockProduct.title);
  });
});
