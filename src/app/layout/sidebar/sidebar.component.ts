import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    const menuToggle = document.getElementById('menu-toggle');
    const wrapper = document.getElementById('wrapper');
    menuToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      wrapper?.classList.toggle('toggled');
    });
  }

  logOut() {
    return this._authService.logout();
  }

}
