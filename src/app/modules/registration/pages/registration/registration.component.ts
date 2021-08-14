import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { RegistrationService } from 'src/app/data/services/registration/registration.service';
import { RegistrationQrComponent } from '../../components/registration-qr/registration-qr.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public otpGenerated$ = new BehaviorSubject(false);

  public registrationForm = new FormGroup({
    identificationNumber: new FormControl(''),
    otp: new FormControl('')
  });

  constructor(private registrationService: RegistrationService, private dialogService: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public finalizeRegistration() {
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
          }
        });

        //Close the dialog after 10 seconds
        dialogRef.afterOpened().subscribe(_ => {
          setTimeout(() => {
            dialogRef.close();
          }, 10000);
        });
      }, err => {
        this._snackBar.open(err.error.message, 'Close', {
          horizontalPosition: 'start',
          verticalPosition: 'bottom',
          duration: 5000
        });
        console.error(err);
      });
  }

  public generateOtp() {
    this.registrationService.generateNewRegistrationOtp(this.registrationForm.controls['identificationNumber'].value)
      .pipe(take(1))
      .subscribe(data => {
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
