import { provideImageKitLoader } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAccount } from 'src/app/core/interface/IAccount';
import { AccountService } from 'src/app/core/service/account.service';
import { TransactionService } from 'src/app/core/service/transaction.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.scss']
})
export class AccountListComponent implements OnInit {

  accountList: any = [];
  userAccountList: any = [];
  transactionPerAccount: any = [];
  accountForm!: FormGroup;
  transactionForm!: FormGroup;
  userId = localStorage.getItem('userId');
  accountId = localStorage.getItem('AccountId');
  @ViewChild('accountModalClose') acModelCloseBtn!: ElementRef;
  @ViewChild('transactionModelClose') tranModelCloseBtn!: ElementRef;
  submitted: boolean = false
  columnDefs: any[];
  defaultColDef: any;
  public themeClass = "ag-theme-alpine";

  constructor(
    private _accountService: AccountService,
    private _router: Router,
    private _transactionService: TransactionService,
    private _fb: FormBuilder
  ) {
    this.columnDefs = [
      { headerName: 'No.', valueGetter: "node.rowIndex+1" },
      { headerName: 'Username', field:'AccountDetails.username'},
      { headerName: 'Email', field:'AccountDetails.email'},
      { headerName: 'Account Number', field:'AccountDetails.AccountNo'},
      { headerName: 'Account Type', field:'AccountDetails.AccountType'},
      { headerName: 'Balance', field:'AccountDetails.Balance',valueFormatter: this.currencyFormatter},
      { headerName: 'Created Date', field:'AccountDetails.AccountCreatedDate',valueFormatter: this.dateFormatter }
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
    this.accountForm = this._fb.group({
      accountType: ['', [Validators.required]],
      balance: ['', [Validators.required]],
    });

    this.transactionForm = this._fb.group({
      toAccount: ['', [Validators.required]],
      transactionType: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      description: ['', [Validators.required]],
    })
    this.loadAllAccounts();
    this.loadUserAccount();
  }

  loadAllAccounts() {
    this._accountService.allAccounts().subscribe(
      (response) => {
        this.accountList = response
      }, (error) => {
        console.error(error)
      }
    )
  }

  loadUserAccount() {
    if (this.userId) {
      this._accountService.accountByUserId(this.userId).subscribe(
        (response) => {
          this.userAccountList = response
        }, (error) => {
          console.error(error);
        }
      )
    }
  }

  addNewAccount() {
    this.submitted = true
    const account = {
      user: this.userId,
      accountType: this.accountForm.get('accountType')?.value,
      balance: this.accountForm.get('balance')?.value,
    };
    this._accountService.createAccount(account).subscribe(
      (data) => {
        this.userAccountList.push(data);
        this.resetAccountForm();
        // console.log(JSON.stringify(data, null, 4));
      }, (error) => {
        console.error();
      }
    )

  }
  hasError(controlName: string, errorName: string): any {
    const control = this.accountForm.get(controlName);
    return (this.accountForm.touched || this.submitted) && control?.hasError(errorName);
  }

  btnToOpenTransactionModel(account: IAccount) {
    if (account._id) {
      localStorage.setItem('AccountId', account._id)
    }
  }
  viewTransaction(account: IAccount) {
    if (account._id) {
      this._transactionService.allTransactionByAccountId(account._id).subscribe(
        (data) => {
          this.transactionPerAccount = data.sort();
          console.log(JSON.stringify(data.sort(), null, 4));
        }, (error) => {
          console.error();
        }
      )
    }

  }
  makeTransaction() {
    this.submitted = true;
    const transaction: any = {
      account: localStorage.getItem('AccountId'),
      toAccount: this.transactionForm.get('toAccount')?.value,
      type: this.transactionForm.get('transactionType')?.value,
      amount: this.transactionForm.get('amount')?.value,
      description: this.transactionForm.get('description')?.value,
    }
    this._transactionService.addTransaction(transaction).subscribe(
      {
        next: (data) => {
          this.transactionPerAccount.push(data);
          this.resetTransactionForm(),
            this.loadUserAccount()
        },
        error: (error) => {
          console.error(error);
        }
      }
    )

    localStorage.removeItem('AccountId')

  }
  resetAccountForm() {
    this.accountForm.reset();
    this.submitted = false;
    this.acModelCloseBtn.nativeElement.click()
  }
  resetTransactionForm() {
    this.transactionForm.reset();
    this.submitted = false;
    this.tranModelCloseBtn.nativeElement.click()
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
