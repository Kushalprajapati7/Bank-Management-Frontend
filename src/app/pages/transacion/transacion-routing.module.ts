import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TrasnsactionAddComponent } from './trasnsaction-add/trasnsaction-add.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all-transaction',
    pathMatch: 'full'
  },
  {
    path: 'all-transaction',
    component: TransactionListComponent
  },
  {
    path: 'add-transaction',
    component: TrasnsactionAddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransacionRoutingModule { }
