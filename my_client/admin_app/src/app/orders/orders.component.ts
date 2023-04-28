import { Component, TemplateRef } from '@angular/core';
import { OrdersService } from 'src/services/orders.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  Orders:any;
  searchText: string = '';
  modalRef!: BsModalRef;
  selectedOrder: any
  constructor(private ordersService:OrdersService,  private modalService: BsModalService){
    this.ordersService.getOrders().subscribe((data) => {
      this.Orders = data;
    });
  }

  searchCustomers() {
    if (this.searchText) {
      this.Orders = this.Orders.filter((customer: { customerName: string; }) =>
        customer.customerName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.ordersService.getOrders().subscribe(customers => {
        this.Orders = customers;
      });
    }
  }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  showOrderDetails(Order: any, template: TemplateRef<any>) {
    this.selectedOrder = Order;
    this.modalRef = this.modalService.show(template);
  }
}