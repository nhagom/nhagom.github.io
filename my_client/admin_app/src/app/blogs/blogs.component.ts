import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IBlog } from 'src/interface/blog';
import { BlogsService } from 'src/services/blogs.service';
import { CheckService } from 'src/services/check.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  blogs:any;
  errMessage:string="";
  modalRef!: BsModalRef;
  selectedBlog: any;
  newBlog : IBlog = {
    blogId:"",
    blogName:"",
    blogTitle: "",
    shortContent: "",
    content1: "",
    content2: "",
    content3: "",
    imgTitle: ""
  };
  showForm: boolean = false;
  result= false;
  disable=false;
  searchText: string = '';
  constructor(private blogsService:BlogsService,private modalService: BsModalService,private checkService:CheckService, private router: Router ){
    this.blogsService.getBlogs().subscribe((data) => {
      this.blogs = data;
    });
  }
  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
  showBlogDetails(blog: any, template: TemplateRef<any>) {
    this.selectedBlog = blog;
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit() {
    if (!this.checkService.checkLogin()) {
      this.router.navigate(['login']);
    }
  }
  getBlog() {
    this.blogsService.getBlogs().subscribe((data) => {
      this.blogs = data;
    });
  }

  onFileSelected (event:any, products: IBlog)
  {
    let me =this;
    let file = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      products.imgTitle=reader.result!.toString()
    };
    reader.onerror= function (error) {
      console.log('Error: ', error);
    };
  }

  deleteBlog(blogId: any) {
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
        this.blogsService.deleteBlog(blogId).subscribe({
          next: (data) => {
            this.blogs = data;
            // this.getProducts();
          },
          error: (err) => {
            this.errMessage = err;
          },
        });
        this.getBlog()
      }
    });
  }
  updateProduct() {
    this.blogsService.updateBlog(this.selectedBlog)
      .subscribe(() => {
        this.modalRef.hide();
        this.getBlog();
      });
  }
  editBlog(blog: any, template: TemplateRef<any>) {
    this.selectedBlog = Object.assign({}, blog);
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    if (this.newBlog.blogId && this.newBlog.blogName && this.newBlog.blogTitle && this.newBlog.shortContent && this.newBlog.content1 && this.newBlog.content2 && this.newBlog.content3 /*&& this.newBlog.imgTitle*/) {
      this.blogsService.addBlog(this.newBlog).subscribe(
        (blog) => {
          console.log("Product added successfully:", blog);
          this.getBlog();
          alert("Bạn đã thêm thành công")
          this.showForm = !this.showForm;
          this.newBlog.blogId="";
          this.newBlog.blogName="";
          this.newBlog.blogTitle="";
          this.newBlog.shortContent="";
          this.newBlog.content1="";
          this.newBlog.content2="";
          this.newBlog.content3="";
          // this.newBlog.imgTitle="";
        },
        (error) => {
          console.error("Error adding blog:", error);
          this.getBlog();
        }
      );
    } else {
      alert("Bạn cần nhập đầy đủ thông tin");
    }
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }
  checkProduct(blogId:string) {
    this.blogsService.checkBlogId(blogId).subscribe((data) => {
      this.result = data;
      if(this.result==true){
        this.disable=true
      }
      else{
        this.disable=false
      }
    });
  }

  searchProducts() {
    if (this.searchText) {
      this.blogs = this.blogs.filter((blog: { blogName: string; blogId: string }) =>
        blog.blogName.toLowerCase().includes(this.searchText.toLowerCase())
        || blog.blogId.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    else {
      this.blogsService.getBlogs().subscribe(data => {
        this.blogs = data;
      });
    }
  }
}
