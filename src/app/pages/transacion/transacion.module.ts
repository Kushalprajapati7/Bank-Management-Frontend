import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransacionRoutingModule } from './transacion-routing.module';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { TrasnsactionAddComponent } from './trasnsaction-add/trasnsaction-add.component';


@NgModule({
  declarations: [
    TrasnsactionAddComponent
  ],
  imports: [
    CommonModule,
    TransacionRoutingModule,
    AgGridModule
  ]
})
export class TransacionModule { }
