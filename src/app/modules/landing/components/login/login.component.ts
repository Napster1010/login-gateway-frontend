import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginRequest } from 'src/app/data/schemas/LoginRequest';
import { LoginService } from 'src/app/data/services/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    identificationNumber: new FormControl(''),
    securityCode: new FormControl(''),
  });

  public hide = true;

  constructor(private loginService: LoginService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  loginUser() {
    const loginRequest: LoginRequest = {
      identificationNumber: this.loginForm.controls['identificationNumber'].value,
      code: this.loginForm.controls['securityCode'].value,
    };
    this.loginService.loginUser(loginRequest)
    .pipe(take(1))
    .subscribe(data => {
      this._snackBar.open('Login successful!', 'Close', {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 5000
      });
      console.log(data);
    }, err => {
      this._snackBar.open('Login unsuccessful!', 'Close', {
        horizontalPosition: 'start',
        verticalPosition: 'bottom',
        duration: 5000
      });
      console.error(err);
    });
  }

}
