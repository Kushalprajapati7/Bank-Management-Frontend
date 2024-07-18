// role.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this._authService.isAdmin()) {
      return true;  
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Unauthorized Access",
        showConfirmButton: false,
        timer: 1000
      });
      this.router.navigate(['/']);  
      return false; 
    }
  }
}
