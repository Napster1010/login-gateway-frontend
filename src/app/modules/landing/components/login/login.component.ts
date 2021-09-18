import { AuthService } from './../../../../data/services/auth/auth.service';
import { shareReplay, take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginRequest } from 'src/app/data/schemas/LoginRequest';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    const loginRequest: LoginRequest = {
      identificationNumber: this.loginForm.controls['identificationNumber'].value,
      code: this.loginForm.controls['securityCode'].value,
    };
    this.authService.loginUser(loginRequest)
    .pipe(take(1))
    .subscribe(authToken => {
      console.log('Redirecting to /home');
      this.authService.storeUserAuthToken(authToken);
      this.router.navigate(['/home']);
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
