import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Form In Invalid!",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this._authService.login(email, password).subscribe(
      (response) => {
        this._router.navigate(['/home']);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in successfully",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (err) => {
        console.error(err);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Invalid login credentials",
          showConfirmButton: false,
          timer: 1500
        });
      }
    );
  }

  hasError(controlName: string, errorName: string): any {
    const control = this.loginForm.get(controlName);
    return (this.loginForm.touched || this.submitted) && control?.hasError(errorName);
  }

}
