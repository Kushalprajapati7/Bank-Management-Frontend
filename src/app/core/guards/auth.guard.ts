import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.isLoggedIn()) {
      return true;
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Unauthorized Accss",
        showConfirmButton: false,
        timer: 1000
      });
      setTimeout(() => {
        this.router.navigate(['/auth/login']);
        return false;
      }, 1000);


      return false;
    }
  }
}
