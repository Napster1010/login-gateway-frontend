import { take } from 'rxjs/operators';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject, interval } from 'rxjs';
import { RegistrationQrData } from 'src/app/data/schemas/RegistrationQrData';

@Component({
  selector: 'app-registration-qr',
  templateUrl: './registration-qr.component.html',
  styleUrls: ['./registration-qr.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationQrComponent implements OnInit {
  public currentProgress$: BehaviorSubject<number> = new BehaviorSubject(100);
  public qrString: string;

  constructor(@Inject(MAT_DIALOG_DATA) public qrData: RegistrationQrData) {
    this.qrString = qrData.qrString;
  }

  ngOnInit(): void {
    interval(50)
      .pipe(take(1200))
      .subscribe(() => {
        this.currentProgress$.next(this.currentProgress$.getValue() - (1/12));
        console.log(this.currentProgress$.getValue());
      });
  }

}
