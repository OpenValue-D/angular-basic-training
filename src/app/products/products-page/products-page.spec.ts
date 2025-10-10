import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ProductsPage } from './products-page';
import { Subject } from 'rxjs';
import { Product } from '../shared/product';
import { getNgModuleById } from '@angular/core';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { ProductsService } from '../products-service';
import { By } from '@angular/platform-browser';
import { ProductsOverview } from '../products-overview/products-overview';
import { createProductMock } from '../shared/product.mock';
import { ProductSearch } from '../product-search/product-search';
import { ProductsFilterPipe } from '../shared/products-filter-pipe';

const EXAMPLE_PRODUCTS = [
  createProductMock({id: 1}),
  createProductMock({id: 2}),
  createProductMock({id: 2}),
]

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;

  let getProductsMock: jasmine.Spy;
  let latestSubject: Subject<Product[]>;

  beforeEach(async () => {
    getProductsMock = jasmine.createSpy('get').and.callFake(() => {
      latestSubject = new Subject<Product[]>();
      return latestSubject.asObservable();
    });

    await TestBed.configureTestingModule({
      imports: [
        ProductsPage,
        MockComponent(ProductsOverview),
        MockComponent(ProductSearch),
        MockPipe(ProductsFilterPipe, (products: any[], searchTerm: string) => products),
      ],
      providers: [
        { provide: ProductsService, useValue: { get: getProductsMock } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    latestSubject.next(EXAMPLE_PRODUCTS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should pass ProducsService response to ProductOverview component', () => {
    const productsOverview = fixture.debugElement.query(By.directive(ProductsOverview));

    const overviewComponent = productsOverview.componentInstance as ProductsOverview;

    expect(overviewComponent.products).toEqual(EXAMPLE_PRODUCTS);
  });

  it('should update products when search changes', () => {
    // GIVEN
    let overview = fixture.debugElement.query(By.directive(ProductsOverview));
    expect((overview.componentInstance as ProductsOverview).products)
      .toEqual(EXAMPLE_PRODUCTS);

    // WHEN
    const productSearch = fixture.debugElement.query(By.directive(ProductSearch))
      .componentInstance as ProductSearch;

    const newProducts = [createProductMock({ id: 99 })];

    productSearch.searchTermUpdated.emit('test');
    fixture.detectChanges();

    latestSubject.next(newProducts);
    fixture.detectChanges();

    // THEN
    expect((overview.componentInstance as ProductsOverview).products)
      .toEqual(newProducts);
  });
});
