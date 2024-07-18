import { Component } from '@angular/core';
import { AuthService } from './core/service/auth.service';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bank';
  constructor(
    private _authService: AuthService,
    private _permissionsService: NgxPermissionsService
  ) { }

  ngOnInit() {
    const role = this._authService.getRole();
    if (role) {
      this._permissionsService.loadPermissions([role]);
    } else {
      console.error('Role not found or invalid:', role);
    }
  }
}
