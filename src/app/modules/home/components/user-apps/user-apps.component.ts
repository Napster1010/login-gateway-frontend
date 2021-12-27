import { concatMap, take, tap } from 'rxjs/operators';
import { AuthService } from './../../../../data/services/auth/auth.service';
import { App } from './../../../../data/schemas/App';
import { Component, Input, OnInit } from '@angular/core';
import { UserActivityLogService } from 'src/app/data/services/user-activity-log/user-activity-log.service';

@Component({
  selector: 'app-user-apps',
  templateUrl: './user-apps.component.html',
  styleUrls: ['./user-apps.component.scss']
})
export class UserAppsComponent implements OnInit {

  @Input()
  public userApps: App[];

  constructor(private authService: AuthService, private userActivityLogService: UserActivityLogService) { }

  ngOnInit(): void {
  }

  public navigateToApp(appId: number, appUrl: string) {
    const authToken = this.authService.getCurrentUserAuthToken();
    // Send request to the backend for updating the activity log.
    this.userActivityLogService.updateAppNavigationActivity(appId)
      .pipe(
        take(1),
        // Logout the current user before navigating the the app
        tap(() => this.authService.logoutCurrentUser())
      ).subscribe(() => {
        const navigationUrl = `${appUrl}?t=${authToken}`;
        window.location.href = navigationUrl;
      });
  }

}
