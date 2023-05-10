import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortPrice'
})
export class sortPricePipe implements PipeTransform {
  transform(products: any[],  sortPrice: string ): any[] {
    if (!products || !sortPrice ) {
      return products;
    }

    let sortedPrice = [...products];

    switch (sortPrice) {
      case 'Under200K':
        sortedPrice = sortedPrice.filter(product => product.price < 200000);
        break;

      case 'From200KTo400K':
        sortedPrice = sortedPrice.filter(product => product.price >= 200000 && product.price < 400000);
        break;

      case 'From400KTo800K':
        sortedPrice = sortedPrice.filter(product => product.price >= 400000 && product.price < 800000);
        break;

      case 'Over800K':
        sortedPrice = sortedPrice.filter(product => product.price >= 800000);
        break;

      }
    return sortedPrice;
  }
}

