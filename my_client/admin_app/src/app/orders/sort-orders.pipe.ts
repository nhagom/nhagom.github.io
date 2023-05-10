import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortOrders'
})
export class SortOrdersPipe implements PipeTransform {
  transform(orders: any[],  sortName: string ): any[] {
    if (!orders || !sortName) {
      return orders;
    }

    let sortedOrders = [...orders];

    switch (sortName) {

      case 'name-asc':
        sortedOrders.sort((a, b) => a.customerName.localeCompare(b.customerName));
        break;
      case 'name-desc':
        sortedOrders.sort((a, b) => b.customerName.localeCompare(a.customerName));
        break;

      }
    return sortedOrders;
  }
}

