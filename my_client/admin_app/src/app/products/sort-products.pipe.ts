import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortProducts'
})
export class SortProductsPipe implements PipeTransform {
  transform(products: any[],  sortOrder: string ): any[] {
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

      case 'Under200K':
        sortedProducts = sortedProducts.filter(product => product.price < 200000);
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case 'From200KTo400K':
        sortedProducts = sortedProducts.filter(product => product.price >= 200000 && product.price < 400000);
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case 'From400KTo800K':
        sortedProducts = sortedProducts.filter(product => product.price >= 400000 && product.price < 800000);
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case 'Over800K':
        sortedProducts = sortedProducts.filter(product => product.price >= 800000);
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      }
    return sortedProducts;
  }
}

