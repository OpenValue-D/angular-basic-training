# Assignment 4 Routing
If you want to catch up:

```
git checkout assignment-3-solution
```

## 4.1 Home page
Let's create a home page component.

- Generate a `HomePage` component in a `home` folder (using `npx ng generate`)

## 4.2 Products page

- Generate a `ProductsPage` component in a `products` folder (using `npx ng generate`)
- Move all product related artifacts in the `products` folder

Now we have to decouple our app from all products related logic.

- Move the template and implementation of `App` component to `ProductsPage` component.

## 4.3 Configuring routes

- In the `app.routes.ts` file wire the `HomePage` component to the root of the router:

```typescript
import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';

export const routes: Routes = [{
        path: '',
        component: HomePage,
    },
];
```

To be able to see the output of the router you must render a `router-outlet`.

- Replace the `App` component template with:

```html
<router-outlet></router-outlet>
```

You should see `home works!` on screen.

- [Defining routes](https://angular.dev/guide/routing/define-routes)

## 4.4 Child routes

- Add a `products` route and load the `ProductsPage` component.
- Ensure that you see the product view when navigating to [`http://localhost:4200/products`](http://localhost:4200/products)

## 4.5 Lazy loading

- Make the route `products` lazy loadable

```typescript
{
  path: 'products',
  loadComponent: () => import('./products/products-page/products-page').then(m => m.ProductsPage),
},
```

In order to lazy load the products overview, all direct references to its code should be removed.

- Remove `ProductsOverviewModule` from `AppModule`'s imports and file import.

Comparing the build output gives us certainty that we caught all references (`npm run build`):

```text
# Before
Initial chunk files   | Names         |  Raw size | Estimated transfer size
main-QSWQAGKV.js      | main          | 340.49 kB |                83.56 kB
polyfills-5CFQRCPP.js | polyfills     |  34.59 kB |                11.33 kB
styles-RLE6SSBR.css   | styles        |   8.95 kB |                 1.71 kB

                      | Initial total | 384.02 kB |                96.60 kB

# After
Initial chunk files   | Names         |  Raw size | Estimated transfer size
chunk-CW7XPIHF.js     | -             | 151.69 kB |                44.44 kB
main-QTMVXAHZ.js      | main          |  78.56 kB |                20.03 kB
polyfills-5CFQRCPP.js | polyfills     |  34.59 kB |                11.33 kB
styles-RLE6SSBR.css   | styles        |   8.95 kB |                 1.71 kB

                      | Initial total | 273.78 kB |                77.51 kB

Lazy chunk files      | Names         |  Raw size | Estimated transfer size
chunk-GIFZZ5F6.js     | products-page | 112.78 kB |                22.26 kB
```

Visit `http://localhost:4200/products` and check if the `ProductsPage` component is rendered. 

- [Route loading strategies lazy vs. eager](https://angular.dev/guide/routing/define-routes#loading-route-component-strategies)

## 4.6 Navigation

- Add a simple navigation to the `App` component template:

```html
<nav>
  <a routerLink="/"
     routerLinkActive="active"
     [routerLinkActiveOptions]="{exact:true}">
    Home
  </a>
  <a routerLink="/products"
     routerLinkActive="active"
     [routerLinkActiveOptions]="{exact:true}">
    Products
  </a>
</nav>

<router-outlet></router-outlet>
```

`routerLinkActive` directive adds the `active` class to the element if that route is currently active.
`[routerLinkActiveOptions]="{exact:true}"` makes sure that `/` is not matched on route `/products`.

- make sure the `RouterLink` and `RouterLinkActive` are correctly imported in `app.ts`

- Add css in `AppComponent` scss to highlight active route links:
```scss
.active {
  background-color: grey;
  cursor: auto;
}
```

You should now be able to navigate between pages.

- Check F12 Network tab to see lazy loading in action when navigation from `home` to `products` (only the first time). You should see
`ProductsPage` load in as JavaScript.


- [Navigate to routes](https://angular.dev/guide/routing/navigate-to-routes)
- [Solution](https://github.com/OpenValue-D/angular-basic-training/compare/assignment-3-solution...assignment-4-solution)