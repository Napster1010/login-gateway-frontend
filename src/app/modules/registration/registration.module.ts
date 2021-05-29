import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './pages/registration/registration.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationQrComponent } from './components/registration-qr/registration-qr.component';


@NgModule({
  declarations: [
    RegistrationComponent,
    RegistrationQrComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    SharedModule
  ]
})
export class RegistrationModule { }
