import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IProduct } from 'src/interface/IProduct';
import { Product } from 'src/models/product';
import { ProductsService } from 'src/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {
  products: any;
  errMessage:string="";
  modalRef!: BsModalRef;
  selectedProduct: any;
  searchText: string = '';
  newProduct: IProduct = {
    productId: "",
    productName: "",
    description: "",
    price: 0,
    image: "",
    set: "",
    size: "",
    style: "",
    trait: ""
  };
  showForm: boolean = false;
  constructor(private productsService: ProductsService, private modalService: BsModalService) {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  showProductDetails(product: any, template: TemplateRef<any>) {
    this.selectedProduct = product;
    this.modalRef = this.modalService.show(template);
  }
  searchProducts() {
    if (this.searchText) {
      this.products = this.products.filter((product: { productName: string; productId: string }) =>
        product.productName.toLowerCase().includes(this.searchText.toLowerCase())
        || product.productId.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    else {
      this.productsService.getProducts().subscribe(data => {
        this.products = data;
      });
    }
  }
  // Xóa product
  refreshPage() {
    window.location.reload();
  }
  getProducts() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
  deleteProduct(productId: any) {
    Swal.fire({
      title: 'Xóa sản phẩm',
      text: 'Bạn chắc chắn muốn xóa sản phẩm này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productsService.deleteProduct(productId).subscribe({
          next: (data) => {
            this.products = data;
            this.getProducts();
          },
          error: (err) => {
            this.errMessage = err;
          },
        });
        this.getProducts()
      }
    });
  }
  updateProduct() {
    this.productsService.updateProduct(this.selectedProduct)
      .subscribe(() => {
        this.modalRef.hide();
        this.getProducts();
      });
  }
  editProduct(product: any, template: TemplateRef<any>) {
    this.selectedProduct = Object.assign({}, product);
    this.modalRef = this.modalService.show(template);
  }
  onSubmit() {
    if (this.newProduct.productId && this.newProduct.productName && this.newProduct.price && this.newProduct.image && this.newProduct.trait && this.newProduct.style) {
      this.productsService.addProduct(this.newProduct).subscribe(
        (product) => {
          console.log("Product added successfully:", product);
          this.getProducts();
        },
        (error) => {
          console.error("Error adding product:", error);
          this.getProducts();
        }
      );
    } else {
      alert("Bạn cần nhập đầy đủ thông tin");
    }
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
}