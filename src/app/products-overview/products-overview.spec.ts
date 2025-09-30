import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOverview } from './products-overview';
import { ProductItem } from '../product-item/product-item';
import { MockComponent } from 'ng-mocks';
import { Product } from '../shared/product';
import { createProductMock } from '../shared/product.mock';
import { By } from '@angular/platform-browser';

describe('ProductsOverview', () => {
  let component: ProductsOverview;
  let fixture: ComponentFixture<ProductsOverview>;

  const PRODUCTS_MOCK: Product[] = [
    createProductMock({
      id: 1,
    }),
    createProductMock({
      id: 2,
    }),
    createProductMock({
      id: 3,
    }),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsOverview, MockComponent(ProductItem)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsOverview);
    component = fixture.componentInstance;
    component.products = PRODUCTS_MOCK;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should render 3 products", () => {
    const productComponents = fixture.debugElement.queryAll(
      By.directive(ProductItem)
    );

    expect(productComponents.length).toBe(3);
    productComponents.forEach(({ componentInstance }, index) => {
        // Check if the @Input paramater of product is set correctly
        expect(componentInstance.product).toEqual(PRODUCTS_MOCK[index]);
    });
  });
});
