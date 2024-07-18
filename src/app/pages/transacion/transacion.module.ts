import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransacionRoutingModule } from './transacion-routing.module';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TransactionListComponent } from './transaction-list/transaction-list.component';


@NgModule({
  declarations: [
    TransactionListComponent
    ],
  imports: [
    CommonModule,
    TransacionRoutingModule,
    AgGridModule
  ]
})
export class TransacionModule { }
