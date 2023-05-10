import { Component, TemplateRef } from '@angular/core';
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CustomersService } from 'src/services/customers.service';
import { CheckService } from 'src/services/check.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent {
  sortName: string = '';

  customers:any
  errMessage:string=""
  modalRef!: BsModalRef;
  selectedCustomer: any;
  searchText: string = '';
  sortOrder: string = 'asc';
  constructor(private customersService: CustomersService, private modalService: BsModalService, private checkService:CheckService,  private router: Router ) {
    this.customersService.getCustomers().subscribe((data) => {
      this.customers = data;
      console.log(this.customers); // In ra danh sách khách hàng
    });
  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  showCustomerDetails(customer: any, template: TemplateRef<any>) {
    this.selectedCustomer = customer;
    this.modalRef = this.modalService.show(template);
  }
  refreshPage() {
    window.location.reload();
  }

  getCustomers() {
    this.customersService.getCustomers().subscribe((data) => {
      this.customers = data;
      console.log(this.customers);
    });
  }
  reset() {
    // Thực hiện logic để đặt lại giá trị sortPrice về giá trị mặc định
    this.sortName = '';
  }

  deleteCustomer(customerEmail: any) {
    Swal.fire({
      title: 'Xóa khách hàng',
      text: 'Bạn chắc chắn muốn xóa khách hàng này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.customersService.deleteCustomer(customerEmail).subscribe({
          next: (data) => {
            this.customers = data;
            this.getCustomers();
          },
          error: (err) => {
            this.errMessage = err;
          },
        });
        this.getCustomers()
      }
    });
  }
  searchCustomers() {
    if (this.searchText) {
      this.customers = this.customers.filter((customer: { customerName: string; }) =>
        customer.customerName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.customersService.getCustomers().subscribe(customers => {
        this.customers = customers;
      });
    }
  }
  ngOnInit() {
    this.customersService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }
  sortCustomers() {
    if (this.sortOrder === 'asc') {
      this.customers.sort((a: { customerName: string }, b: { customerName: string }) => a.customerName.localeCompare(b.customerName));
      this.sortOrder = 'desc';
    } else {
      this.customers.sort((a: { customerName: string }, b: { customerName: string }) => b.customerName.localeCompare(a.customerName));
      this.sortOrder = 'asc';
    }
  }
  ngOnInittt() {
    if (!this.checkService.checkLogin()) {
      this.router.navigate(['login']);
    }
  }
}
