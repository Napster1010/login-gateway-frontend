import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { RegistrationService } from 'src/app/data/services/registration/registration.service';
import { RegistrationQrComponent } from '../../components/registration-qr/registration-qr.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm = new FormGroup({
    identificationNumber: new FormControl(''),
  });

  constructor(private registrationService: RegistrationService, private dialogService: MatDialog) { }

  ngOnInit(): void {
  }

  public registerNewUser() {
    this.registrationService.registerNewUser(this.registrationForm.controls['identificationNumber'].value)
    .pipe(take(1))
    .subscribe(data => {
      console.log(data);
      this.dialogService.open(RegistrationQrComponent, {
        data: {
          qrString: data
        }
      });
    }, err => {
      console.error(err);
    });
  }

}
