import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shipOrders'
})
export class ShipOrdersPipe implements PipeTransform {
  transform(orders: any[],  sortShip: string ): any[] {
    if (!orders || !sortShip) {
      return orders;
    }

    let shipdOrders = [...orders];

    switch (sortShip) {

      case 'COD':
        shipdOrders = shipdOrders.filter(order => order.shipMethod === "COD");
        break;
      case 'Banking':
        shipdOrders = shipdOrders.filter(order => order.shipMethod === "Banking");
        break;


      }
    return shipdOrders;
  }
}

