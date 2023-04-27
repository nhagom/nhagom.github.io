import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortProducts'
})
export class SortProductsPipe implements PipeTransform {
  transform(products: any[],  sortOrder: string): any[] {
    if (!products || !sortOrder) {
      return products;
    }

    let sortedProducts = [...products];

    switch (sortOrder) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        sortedProducts.sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case 'name-desc':
        sortedProducts.sort((a, b) => b.productName.localeCompare(a.productName));
        break;
    }

    return sortedProducts;
  }
}

