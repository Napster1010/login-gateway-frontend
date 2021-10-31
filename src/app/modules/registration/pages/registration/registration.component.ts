import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
  constructor() { }

  ngOnInit(): void {
  }

}
