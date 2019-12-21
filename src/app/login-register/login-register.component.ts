import { Component, OnInit } from '@angular/core';
import { User } from '../DTOs/User';
import { Router } from '@angular/router';
import { AuthService } from '../Services/Auth.service';
declare var $: any;
@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  UserSignIn: User = new User();
  UserRegister: User = new User();
  ErrorMessage: string;
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.UserSignIn).subscribe(next => {
      this.router.navigate(['/home']);
    }, error => {
      this.ErrorMessage = error.error;
      console.log(this.ErrorMessage);
      $('#SomethingIsWrongModal').modal('show');
    });
  }

  signup() {
    this.authService.signup(this.UserRegister).subscribe(next => {
      this.router.navigate(['/home']);
      console.log('successful');
    }, error => {
      this.ErrorMessage = error.error;
      console.log(error.error);
      $('#SomethingIsWrongModal').modal('show');
    });
  }
  refreshtoken() {
    this.authService.refreshToken();
  }
}
