import { AuthService } from './../../../../data/services/auth/auth.service';
import { App } from './../../../../data/schemas/App';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-apps',
  templateUrl: './user-apps.component.html',
  styleUrls: ['./user-apps.component.scss']
})
export class UserAppsComponent implements OnInit {

  @Input()
  public userApps: App[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public navigateToApp(appUrl: string) {
    // Logout the current user before navigating the the app
    this.authService.logoutCurrentUser();
    window.location.href = appUrl;
  }

}
