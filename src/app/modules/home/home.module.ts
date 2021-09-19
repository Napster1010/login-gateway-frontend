import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UserAppsComponent } from './components/user-apps/user-apps.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [
    HomeComponent,
    UserAppsComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
