# Assignment 2 Testing
If you want to catch up:

```
git checkout assignment-1-solution
```

## 1.1 Mock data
To reduce boilter plate code in tests it's a good idea to centralize mock data creation.

- Create a file called `shared/product.mock.ts` and paste the following code:

```typescript
import { Product } from './product';

export const createProductMock = (product: Partial<Product> = {}): Product => ({
  price: 10,
  description: 'description',
  title: 'title',
  category: 'category',
  image: 'image',
  id: 1,
  rating: {
    count: 10,
    rate: 5,
  },
  ...product,
});
``` 

Resources:
- [Partial type](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)
- [...spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

This mock function returns a default mock object that can be overridden by the caller:

```typescript
// Usage
createProductMock(); // default
createProductMock({ id: 2 }); // default + custom id
createProductMock({ id: 2, title: 'foo' }); // default + custom id + custom title
``` 

## 1.2 ProductsOverview component

- Install ng-mocks:

```
npm i --save-dev ng-mocks
```

- Study the following test and copy it to `products-overview.spec.ts`:

```typescript
// ...
import { MockComponent } from 'ng-mocks';
import { createProductMock } from '../shared/product.mock';

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
```

Resources:
- [MockComponent](https://ng-mocks.sudo.eu/api/MockComponent)
- [Component testing](https://angular.dev/guide/testing/components-scenarios)
- [Docs for DebugElement](https://angular.dev/api/core/DebugElement)
- [Docs for HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)
  - having methods like `innerText` and [`innerHTML`](https://developer.mozilla.org/de/docs/Web/API/Element/innerHTML)

## 1.3 ProductItem component

- Test `ProductItem` by implementing the following test cases:


```typescript
it('should render product title, category, description and price', () => {
  // ...
});

it('should render a rating', () => {
  // ...
});

it('should render a square image with src and alt', () => {
  // ...
});
```

- an input argument can be set using `fixture.componentRef.setInput('product', mockProduct);`
- an HTML element can be queried by CSS class uing `fixture.nativeElement.querySelector('.<class>');`
- a child component can be queried with the `debugElement`
```typescript
const ratingComponents: DebugElement[] = fixture.debugElement.queryAll(
  By.directive(StarRating) // here you can put the Child component you want to query
);
```

Resources:
- [Component testing](https://angular.dev/guide/testing/components-scenarios)

[Solution](https://github.com/OpenValue-D/angular-basic-training/compare/assignment-1-solution...assignment-2-solution)
