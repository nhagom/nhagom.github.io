import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CheckService } from 'src/services/check.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private checkService:CheckService, private router: Router){}
ngOnInit() {
  if (!this.checkService.checkLogin()) {
    this.router.navigate(['login']);
  }
}
}
