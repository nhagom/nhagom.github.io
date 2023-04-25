import { Component } from '@angular/core';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.component.html',
  styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent {
  // title = 'ĐÁNH GIÁ';
  // expand = false;
  // columnsToDisplay = this.expand
  //     ? [
  //           'id',
  //           'diem',
  //           'noidung',
  //           'idsanpham',
  //           'iduser',
  //           'created_at',
  //           'updated_at',
  //           'action'
  //       ]
  //     : ['id', 'diem', 'noidung', 'idsanpham', 'iduser', 'action'];
  // danhgias: DanhGia[] = [];
  // sanphams: Sanpham[] = [];
  // users: User[] = [];
  // subscriptions: Subscription[] = [];
  // dataSource;
  // isLoading = false;
  // constructor(
  //     // private sanphamService: SanphamService,
  //     // private userService: UserService,
  //     private danhgiaService: DanhgiaService,
  //     public dialog: MatDialog,
  //     private confirmDialogService: ConfirmDialogService,
  //     private myHelper: MyHelper
  // ) {}
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  // ngOnInit() {
  //     this.isLoading = true;
  //     this.loadData();
  // }
  // loadData() {
  //     this.subscriptions.push(
  //         this.danhgiaService.currentDanhGia.subscribe(
  //             data => {
  //                 this.danhgias = data;
  //                 this.dataSource = new MatTableDataSource<DanhGia>(
  //                     this.danhgias
  //                 );
  //                 this.dataSource.paginator = this.paginator;
  //                 this.dataSource.sort = this.sort;
  //                 this.isLoading = false;
  //             },
  //             err => {}
  //         )
  //     );
  // }
  // ngOnDestroy(): void {
  //     if (this.subscriptions) {
  //         this.subscriptions.forEach(e => {
  //             e.unsubscribe();
  //         });
  //     }
  // }
  // onDelete(danhgia: DanhGia) {
  //     this.confirmDialogService.openDialog().then(result => {
  //         if (result) {
  //             this.danhgiaService.delete(danhgia);
  //         }
  //     });
  // }
  // applyFilter(filterValue: string) {
  //     this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  // onExpand() {
  //     this.expand = !this.expand;
  //     this.columnsToDisplay = this.expand
  //         ? [
  //               'id',
  //               'diem',
  //               'noidung',
  //               'idsanpham',
  //               'iduser',
  //               'created_at',
  //               'updated_at',
  //               'action'
  //           ]
  //         : ['id', 'diem', 'noidung', 'idsanpham', 'iduser', 'action'];
  // }
  // onAdd() {
  //     this.dialog.open(DanhgiaCreateComponent, {
  //         width: '400px'
  //     });
  // }
  // onEdit(data) {
  //     this.dialog.open(DanhgiaEditComponent, {
  //         width: '400px',
  //         data
  //     });
  // }
}
