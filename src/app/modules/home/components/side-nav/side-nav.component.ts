import { AuthService } from './../../../../data/services/auth/auth.service';
import { User } from './../../../../data/schemas/User';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavComponent implements OnInit {

  @Input()
  public user: User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public logout() {
    this.authService.logoutCurrentUser();
    this.router.navigate(['/login']);
  }

}
