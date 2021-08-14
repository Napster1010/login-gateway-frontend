import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrationQrData } from 'src/app/data/schemas/RegistrationQrData';

@Component({
  selector: 'app-registration-qr',
  templateUrl: './registration-qr.component.html',
  styleUrls: ['./registration-qr.component.scss']
})
export class RegistrationQrComponent implements OnInit {
  public qrString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public qrData: RegistrationQrData) {
    this.qrString = qrData.qrString;
  }

  ngOnInit(): void {
  }

}
