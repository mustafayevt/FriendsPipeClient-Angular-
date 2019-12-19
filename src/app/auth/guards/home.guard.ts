import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { AuthService } from '../../Services/Auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    return this.canLoad();
  }

  canLoad() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/LoginRegister']);
    }
    return this.authService.isLoggedIn();
  }
}
