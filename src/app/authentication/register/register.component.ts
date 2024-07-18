import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interface/IUser';
import { AuthService } from 'src/app/core/service/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;
  summited: boolean = false;
  formData: any = [];
  constructor(
    private _fb: FormBuilder, 
    private _router: Router,
    private _authService: AuthService
  ) { }
  ngOnInit(): void {
    this.registerForm = this._fb.group({
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]]
    })

    // this.onSubmit();
  }

  onSubmit() {
    this.summited = true;
    if (this.registerForm.invalid) {
      return
    }
    this.formData.push(this.registerForm.value);

    const user: IUser = {
      username: this.registerForm.get('userName')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value,
    }
    this._authService.register(user).subscribe(
      (response) => {
        console.log('Register Done');
        
        this._router.navigate(['auth/login'])
      },
      error => {
        console.log(error);
      }

    )


  }

  hasError(controlName: string, errorName: string): boolean {
    return this.registerForm.controls[controlName].touched && this.registerForm.controls[controlName].hasError(errorName);
  }
}
