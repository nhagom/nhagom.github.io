import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortCustomers'
})
export class SortCustomersPipe implements PipeTransform {
  transform(customers: any[],  sortName: string ): any[] {
    if (!customers || !sortName) {
      return customers;
    }

    let sortedCustomers = [...customers];

    switch (sortName) {

      case 'name-asc':
        sortedCustomers.sort((a, b) => a.customerName.localeCompare(b.customerName));
        break;
      case 'name-desc':
        sortedCustomers.sort((a, b) => b.customerName.localeCompare(a.customerName));
        break;


      }
    return sortedCustomers;
  }
}

