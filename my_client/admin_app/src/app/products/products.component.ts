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

  //Sắp xếp
  sortOrder: string = '';
  sortPrice: string = '';

  products: any;
  startDate = '';
  endDate = '';
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
    trait: "",
    productDate: "" // add productDate property with a default value
  };
  productId: string = '';
  result= false;
  showForm: boolean = false;
  disable=false;
  isFormInvalid = false;
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

  reset() {
    // Thực hiện logic để đặt lại giá trị sortPrice về giá trị mặc định
    this.sortPrice = '';
    this.sortOrder = '';
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

  searchByDate() {
    const filteredProducts = this.products.filter((product: { productDate: Date}) => {
      const productDate = new Date(product.productDate);
      return (
        productDate >= new Date(this.startDate) && productDate <= new Date(this.endDate)
      );
    });
    this.products = filteredProducts;
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
  onFileSelected (event:any, product: any)
  {
    let me =this;
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      product.image=reader.result!.toString()
    };
    reader.onerror= function (error) {
      console.log('Error: ', error);
    };
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
            // this.getProducts();
          },
          error: (err) => {
            this.errMessage = err;
          },
        });
        this.getProducts()
      }
    });
  }
  // updateProduct() {
  //   this.productsService.updateProduct(this.selectedProduct)
  //     .subscribe(() => {
  //       this.modalRef.hide();
  //       this.getProducts();
  //     });
  // }
  updateProduct() {
    if (this.validateForm()) {
      this.productsService.updateProduct(this.selectedProduct)
        .subscribe(() => {
          this.modalRef.hide();
          this.getProducts();
        });
    }
  }
  validateForm(): boolean {
    const validForm  =
      !this.selectedProduct.productName ||
      !this.selectedProduct.price ||
      !this.selectedProduct.image ||
      !this.selectedProduct.style ||
      !this.selectedProduct.trait;

    this.isFormInvalid = validForm;
    return !validForm;
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
          alert("Bạn đã thêm thành công")
          this.showForm = !this.showForm;
          this.newProduct.productId="";
          this.newProduct.productName="";
          this.newProduct.price=0;
          this.newProduct.description="";
          this.newProduct.set="";
          this.newProduct.size="";
          this.newProduct.style="";
          this.newProduct.trait="";
          this.newProduct.image="";
        },
        (error) => {
          console.error("Error adding product:", error);
          // this.getProducts();
        }
      );
    } else {
      alert("Bạn cần nhập đầy đủ thông tin");
    }
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  checkProduct(productId:string) {
    this.productsService.checkProductId(productId).subscribe((data) => {
      this.result = data;
      if(this.result==true){
        this.disable=true
      }
      else{
        this.disable=false
      }
    });
  }


}
