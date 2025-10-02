import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../shared/product';

@Pipe({
  name: 'productsFilter'
})
export class ProductsFilterPipe implements PipeTransform {

  transform(products: Product[], searchTerm: string): Product[] {
    return products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
