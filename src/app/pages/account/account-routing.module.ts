import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-account',
    pathMatch: 'full'
  },
  {
    path: 'all-account',
    component: AccountListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
