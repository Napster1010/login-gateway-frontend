import { take } from 'rxjs/operators';
import { RegistrationQrComponent } from './../registration-qr/registration-qr.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationService } from 'src/app/data/services/registration/registration.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  public otpGenerated$ = new BehaviorSubject(false);

  public registrationForm = new FormGroup({
    identificationNumber: new FormControl(''),
    otp: new FormControl('')
  });


  constructor(private registrationService: RegistrationService, private dialogService: MatDialog, private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  public finalizeRegistration() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.registrationService.finalizeRegistration(this.registrationForm.controls['identificationNumber'].value, this.registrationForm.controls['otp'].value)
      .pipe(take(1))
      .subscribe(data => {
        // Reset form
        this.otpGenerated$.next(false);
        this.registrationForm.reset();
        Object.keys(this.registrationForm.controls).forEach(key => {
          this.registrationForm.controls[key].setErrors(null);
        });

        const dialogRef = this.dialogService.open(RegistrationQrComponent, {
          data: {
            qrString: data
          },
          disableClose: true,
          panelClass: 'registration-qr-dialog'
        });

        //Close the dialog after 60 seconds
        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
            dialogRef.close();
          }, 60000);
        });

        this.router.navigate(['/']);
      }, err => {
        this._snackBar.open('Invalid registration OTP!', 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 5000
        });
        console.error(err);
      });
  }

  public generateOtp() {
    if (this.registrationForm.invalid) {
      return;
    }

    this.registrationService.generateNewRegistrationOtp(this.registrationForm.controls['identificationNumber'].value)
      .pipe(take(1))
      .subscribe(() => {
        this.otpGenerated$.next(true);
      }, err => {
        console.error(err.error.message);
        this._snackBar.open(err.error.message, 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 5000
        });
      });
  }

}
