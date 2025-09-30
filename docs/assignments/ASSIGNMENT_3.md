# Assignment 3 Practice (+ homework)
If you want to catch up:

```
git checkout assignment-2-solution
```

## Search component

- Generate a `ProductSearch`component (using `npx ng generate`)
- Implement the following requirements:
  - It uses a [MatInput](https://material.angular.dev/components/input/overview) (you'll have to install `@angular/material` using `npx ng add @angular/material`)
  - It uses two-way binding NgModel (feature module must import `FormsModule`). Example:
    ```html
    <input [(ngModel)]="value" (ngModelChange)="doSomething($event)" />
    ```
  - emits an event called 'search' each time the input changes. See [guide](https://angular.dev/guide/components/outputs).
  - It's rendered above `ov-products-overview` in `AppComponent` html.


Resources:
- [Output guide](https://angular.dev/guide/components/outputs)
- [Angular Material](https://material.angular.io/)

## ProductsFilter pipe

- Generate a products filter `Pipe`:

```shell
npx ng generate pipe products-filter

# or

npx ng g p products-filter
```

- it should be used as follows in the `App` component:
```html
<ov-products [products]="products | productsFilter: query"></ov-products>
```

- Make sure the `Pipe` uses a `filter` string (lowercase) to filter `Product`s based on title (lowercase).

Resources:
- [Guide Pipes](https://angular.dev/guide/templates/pipes).

## Client-side search

- Move the hardcoded products from the `ProductsOverview` component to `App` component and add an input binding `products` to `ProductsOverview`.

- Apply the `ProductsFilter` pipe to the `products` passed to `<ov-products>` and connect it to the search value of `Search` component.

You should now be able to filter products by typing into the input field.

## Rating component (Bonus)

Rating stars are currently hardcoded. In this assignment you'll have to use plain JS to generate 5 `span` elements with
either a full, half or empty star. Here's some TypeScript that helps to type and render the stars:
```typescript
type Star = 0 | 0.5 | 1;

const STAR_CLASSES: Record<Star, string> = {
  '0': 'star fa fa-star-o',
  '0.5': 'star fa fa-star-half-o',
  '1': 'star fa fa-star',
};
```

- Implement the following requirements:
  - It accepts `starCount` and `reviewCount`.
  - It uses `ViewChild` to fill a container with 5 spans that each have the correct star class based on `rate`/5.
  - It rounds up/down to full or half numbers.
    - 3.7 -> 3.5 stars
    - 3.75 -> 4 stars
    - 1.20 = 1 star
    - 1.25 = 1.5 star
  - It is properly unit tested.

Resources:
  - [AfterViewInit lifecycle hook](https://angular.dev/guide/components/lifecycle#ngafterviewinit)
  - [ViewChild native DOM example](https://blog.angular-university.io/angular-viewchild/#usingviewchildtoinjectareferencetoadomelement)
  - [JS DOM creation](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)

## Additional sources (Bonus)

### Angular

- [Angular Documentation](https://angular.dev/overview) Overview over all Angular docs.

- [Angular Architecture - Smart Components vs Presentational Components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)
  explains the importance of structured component hierarchies.

- [Introduction to forms in Angular](https://angular.dev/guide/forms)
  explains the two options Angular provides for handling forms.

- [@for in-depth](https://blog.angular-university.io/angular-for/) 
  explains how to use and optimize `@for`.
  
- [Angular @ViewChild: In-Depth Explanation (All Features Covered)](https://blog.angular-university.io/angular-viewchild/)
  explains how to manipulate the DOM with TypeScript inside a component.

- [Component testing](https://angular.dev/guide/testing/components-scenarios)
  explains testing with `TestBed` in detail.

### TypeScript

- [Utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
  explains the built-in TypeScript utility types.

[Solution](https://github.com/OpenValue-D/angular-basic-training/compare/assignment-2-solution...assignment-3-solution)