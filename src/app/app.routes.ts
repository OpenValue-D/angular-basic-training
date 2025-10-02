import { Routes } from '@angular/router';
import { HomePage } from './home/home-page/home-page';
import { ProductsPage } from './products/products-page/products-page';

export const routes: Routes = [{
        path: '',
        component: HomePage,
    }, {
        path: 'products',
        loadComponent: () => import('./products/products-page/products-page').then(m => m.ProductsPage),
    },
];