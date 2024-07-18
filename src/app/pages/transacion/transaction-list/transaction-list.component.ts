import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/core/service/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit {
  transactionList: any[] = [];
  columnDefs: any[];
  defaultColDef: any;
  public themeClass: string =
    "ag-theme-alpine";

  constructor(
    private _transactionService: TransactionService
  ) {
    this.columnDefs = [
      { headerName: 'No.', valueGetter: "node.rowIndex + 1" },
      { headerName: 'Date', field: 'transactionDetails.transactionDate', valueFormatter: this.dateFormatter },
      { headerName: 'Sender Username', field: 'transactionDetails.sourceUsername' },
      { headerName: 'Sender\'s A/C No.', field: 'transactionDetails.sourceAccountNumber' },
      { headerName: 'Sender\'s A/C Type', field: 'transactionDetails.sourceAccountType' },
      { headerName: 'Receiver Username', field: 'transactionDetails.destinationUsername' },
      { headerName: 'Receiver\'s A/C No.', field: 'transactionDetails.destinationAccountNumber' },
      { headerName: 'Receiver\'s A/C Type', field: 'transactionDetails.destinationAccountType' },
      { headerName: 'Amount', field: 'transactionDetails.amount', valueFormatter: this.currencyFormatter },
      { headerName: 'Transaction Type', field: 'transactionDetails.type' },
      { headerName: 'Description', field: 'transactionDetails.description' }
    ];

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true
    };
  }

  ngOnInit(): void {
    this.allTransaction();
  }

  allTransaction() {
    this._transactionService.allTransactions().subscribe(
      (data) => {
        this.transactionList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  currencyFormatter(params: any): string {
    if (params.value !== undefined) {
      return new Intl.NumberFormat('INR', { style: 'currency', currency: 'INR' }).format(params.value);
    } else {
      return '';
    }
  }

  dateFormatter(params: any): string {
    if (params.value !== undefined) {
      const date = new Date(params.value);
      return new Intl.DateTimeFormat('INR', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
    } else {
      return '';
    }
  }

}

