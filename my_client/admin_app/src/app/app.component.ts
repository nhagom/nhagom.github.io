import { Component } from '@angular/core';
import { AdminService } from 'src/services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'admin_app';
  isLogin=false;
  notLogin=true;
  constructor(private adminService:AdminService){}
  ngOnInit(){
    this.adminService.isLoggedIn$.subscribe(data=>{
      this.isLogin=data;
      this.notLogin=!data
    })
  }
}
