import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interface/IUser';
import { UserService } from 'src/app/core/service/user.service';
import { ActionsRendererComponent } from 'src/app/shared/action-render/action-render.component';
import Swal from 'sweetalert2';
import {
  ColDef,
  ColGroupDef,
  ColumnResizedEvent,
  GridApi,
  GridOptions,
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy,
  createGrid,
} from "ag-grid-community";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  userList: IUser[] = [];
  userForm!: FormGroup;
  submitted: boolean = false;
  isUpdating: boolean = false;
  currentUserId: string | null = null;
  @ViewChild('userFormModel') userFormModel!: ElementRef;
  defaultColDef: any;
  columnDefs: any;
  public themeClass: string = "ag-theme-alpine";
  frameworkComponents: any

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _fb: FormBuilder
  ) {
    this.frameworkComponents = {
      cellRenderer: ActionsRendererComponent,
    };

    this.columnDefs = [
      { headerName: 'No.', valueGetter: "node.rowIndex + 1", width: 50 },
      { headerName: 'User ID', field: '_id', width: 305 },
      { headerName: 'Username', field: 'username', width: 150 },
      { headerName: 'Email', field: 'email', width: 350 },
      { headerName: 'Role', field: 'role', width: 140 },
      {
        headerName: 'Action',
        cellRenderer: 'cellRenderer',
        cellRendererParams: {
          onEdit: this.updateUser.bind(this),
          onDelete: this.deleteUser.bind(this)
        },
        width: 250

      }
    ];

    this.defaultColDef = {
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true
    };
  }

  ngOnInit(): void {
    this.userForm = this._fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
    this.loadAllUsers();
  }

  loadAllUsers() {
    this._userService.allUser().subscribe(
      (response) => {
        this.userList = response;
      }, (error) => {
        console.error(error);
      }
    );
  }
  loadUserDetails(userId: string) {
    this._userService.getUserById(userId).subscribe(
      (user) => {
        this.userForm.patchValue({
          userName: user.username,
          email: user.email,
          password: '',
          role: user.role
        });
      },
      (error) => {
        console.error('Error loading User details:', error);
      }
    );
  }

  deleteUser(user: IUser) {
    const userId = user._id;
    if (!userId) {
      throw new Error('User not found');
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(userId).subscribe(
          (response) => {
            this.userList = this.userList.filter((u) => u._id !== user._id);
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            console.error(error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the user.",
              icon: "error"
            });
          }
        );
      }
    });
  }


  updateUser(user: IUser) {
    if (user._id) {
      this.isUpdating = true;
      this.currentUserId = user._id;
      this.loadUserDetails(user._id);
    }

  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    const user: IUser = {
      username: this.userForm.get('userName')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      role: this.userForm.get('role')?.value
    };

    if (this.isUpdating && this.currentUserId) {
      this._userService.updateUser(this.currentUserId, user).subscribe(
        (response: IUser) => {
          const index = this.userList.findIndex(u => u._id === this.currentUserId);
          this.userList[index] = response;

          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Updated Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.resetForm();
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this._userService.addUser(user).subscribe(
        response => {
          this.userList.push(response);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Added Successfully",
            showConfirmButton: false,
            timer: 1000
          });
          this.resetForm();
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  resetForm() {
    this.submitted = false;
    this.isUpdating = false;
    this.currentUserId = null;
    this.userForm.reset();
    this._router.navigate(['user/all-user']);
    this.userFormModel.nativeElement.click();
  }

  hasError(controlName: string, errorName: string): any {
    const control = this.userForm.get(controlName);
    return (this.userForm.touched || this.submitted) && control?.hasError(errorName);
  }

}
