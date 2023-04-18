import { Component } from '@angular/core';
import { LoginComponent } from '../login-page/login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public totalItem:number = 0;
  public searchTerm !: string;
  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(LoginComponent, {
      // width:'60%'
    });
  }

}
