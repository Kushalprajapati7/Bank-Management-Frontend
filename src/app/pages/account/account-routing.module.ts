import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountAddEditComponent } from './account-add-edit/account-add-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-account',
    pathMatch: 'full'
  },
  {
    path: 'all-account',
    component: AccountListComponent
  },
  {
    path: 'add-account',
    component: AccountAddEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
