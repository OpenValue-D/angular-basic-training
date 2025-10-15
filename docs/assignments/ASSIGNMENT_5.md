# Assignment 5 Services + HTTP Calls

If you want to catch up:

```
git checkout assignment-4-solution
```


## 5.1 Products service

- Generate a `ProductsService` (using `npx ng generate`)
- the service should provide the `Products` in a `get` method
  - take the example products from the `ProductsPage` component
- it should have a `get` method, which returns the products
- refactor the `ProductsPage` to use the products from the `ProductsService`

<details>
<summary>Hint for creating the `ProductsService`</summary>
- the `get` method doesn't need a parameter
- the method has `Product[]` as response type
  
```typescript
// the method signature looks like this
methodName(): ResponseType {
  // code
  return [{}]; // add correct products here
}
```
</details>

<details>
<summary>Hint for using service in `ProductPage`</summary>

- inject the service using the `inject` method
  
```typescript
private productService = inject(ProductsService);
```
- the products may be saved in the existing `products` class field
- the products can be fetched in the `ngOnInit` lifecycle method
```typescript
ngOnInit() {  
  this.products = this.productService.get();
}
```
</details>

References:
- [Guide Creating a Service](https://angular.dev/guide/di/creating-injectable-service)

## 5.2 Fetch Products from API

Use the [fakestoreapi](https://fakestoreapi.com/docs) to fetch the products dynamically.

- setup the [HTTP client](https://angular.dev/guide/http/setup) in the `app.config.ts` component
- inject and use the HTTPClient in the `ProductService`'s `get` method to make calls to the [fakestoreapi](https://fakestoreapi.com/docs)

The response of the HttpClients call can be typed easily:
```typescript
this.http.get<Product[]>('https://fakestoreapi.com/products');
```

<details>
<summary>Hint for injecting the HttpClient</summary>

- inject the service using the `inject` method
  
```typescript
private http = inject(HttpClient);
```
</details>

<details>
<summary>Hint for updating the `get` method</summary>

- the types need to be updated accordingly as the `httpClient`
  returns a `Observable`
  
```typescript
get(): Observable<Product[]> {
  return this.http.get<Product[]>('https://fakestoreapi.com/products');
}
```

- remember also the types in the `ProductPage` component needs to be changed
```typescript
ngOnInit() {  
  this.productService.get(this.searchTerm).subscribe({
    next: (value) => // do something with the value,
    error: (err) => console.log("Error when fetching products.", err),
  });
}
```
</details>

References:
- [Observable docs](https://rxjs.dev/guide/observable)
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
