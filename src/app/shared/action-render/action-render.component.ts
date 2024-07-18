import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-action-render',
  templateUrl: './action-render.component.html',
  styleUrls: ['./action-render.component.scss']
})
export class ActionsRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  editUser() {
    if (this.params.onEdit) {
      this.params.onEdit(this.params.data);
    }
  }

  deleteUser() {
    if (this.params.onDelete) {
      this.params.onDelete(this.params.data);
    }
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
}

