import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LandingComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LandingModule { }
