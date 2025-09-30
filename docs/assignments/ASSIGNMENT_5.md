# Assignment 5 Services + HTTP Calls

If you want to catch up:

```
git checkout assignment-4-solution
```


## 5.1 Products service

- Generate a `ProductsService` (using `npx ng generate`)
- the service should provide the `Products` as an `Observable`
  - take the example products from the `ProductsPage` component

With `of` you can create an Observable from an existing value:

```typescript
get(): Observable<Product[]> {
  return of(EXAMPLE_PRODUCTS);
}
```
- refactor the `ProductOverview` to use the products from the `ProductsService`


```html
<!-- You can use the async pipe to get the values from the observable-->
<ov-products-overview [products]="(products$ | async) || [] | productsFilter: searchTerm"></ov-products-overview>
<!-- The `|| []` syntax makes sure there is a value at any time, required to make the TS compiler happy -->
```

References:
- [Async Pipe](https://angular.dev/api/common/AsyncPipe)
- [Observable docs](https://rxjs.dev/guide/observable)
- [Subject docs](https://rxjs.dev/guide/subject)

## 5.2 Fetch Products from API

Use the [fakestoreapi](https://fakestoreapi.com/docs) to fetch the products dynamically.

- setup the [HTTP client](https://angular.dev/guide/http/setup) in the `app.config.ts` component
- inject and use the HTTPClient in the `ProductService` to make calls to the [fakestoreapi](https://fakestoreapi.com/docs)

The response of the HttpClients call can be typed easily:
```typescript
this.http.get<Product[]>('https://fakestoreapi.com/products');
```

References:
- [Angular HTTP client](https://angular.dev/guide/http)
- [fakestoreapi docs](https://fakestoreapi.com/docs)

## 5.3 Improve Search

We now want to use the search input as a filter for the HTTP call.

- extend the `ProductService` to accept a search string. Use the search string in a query param called `filter`. (Hint the filter will not do anything)
- update the products whenever the search string changes
- make sure that the HTTP call is only made once the user stops typing (only emit changed values after a debounce time of 500ms)
  - the RxJS operator [`debounceTime`](https://rxjs.dev/api/operators/debounceTime) may be used
  - and the RxJS operator [`distinctUntilChanged`](https://rxjs.dev/api/operators/distinctUntilChanged) may be used
- ensure the subscription is destroyed, when the `ProductSearch` component is destroyed

## Additional assignments

### Fix tests

- refactor the tests of `ProductOverview` to work with the `ProductsService`
  You could use the following code snippets if you like:

```typescript
productsSubject = new Subject();

// ...

await TestBed.configureTestingModule({
  declarations: [
    ProductsOverviewComponent,
    MockComponent(ProductsComponent),
    MockComponent(SearchComponent)
  ],
  providers: [
    MockProvider(ProductsService, {
      products$: productsSubject
    })
  ]
})
.compileComponents();

// ...

productsSubject.next(PRODUCTS_MOCK);
fixture.detectChanges();
```

- Create tests for the `ProductsService`

## References:
- [Angular Interoperation with RxJS](https://angular.dev/ecosystem/rxjs-interop)
- [Angular takeUntilDestroyed operator](https://angular.dev/ecosystem/rxjs-interop/take-until-destroyed)

[Solution](https://github.com/OpenValue-D/angular-basic-training/compare/assignment-4-solution...assignment-5-solution)
