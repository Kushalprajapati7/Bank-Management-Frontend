import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TransactionListComponent } from './transacion/transaction-list/transaction-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxPermissionsModule.forChild(),
    AgGridModule
  ]
})
export class PagesModule { }
