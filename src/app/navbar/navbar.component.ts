import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/Auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName: string;
  constructor(private authService: AuthService, private router: Router) {
    this.userName = authService.loggedUser;
  }

  ngOnInit() {
  }
  logout() {
    this.authService.logout()
      .subscribe(success => {
        if (success) {
          this.router.navigate(['/LoginRegister']);
        }
      }, error => {
        this.router.navigate(['/LoginRegister']);
      });
  }
}
