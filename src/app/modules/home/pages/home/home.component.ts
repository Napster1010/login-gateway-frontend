import { App } from './../../../../data/schemas/App';
import { User, UserToken } from './../../../../data/schemas/User';
import { AuthService } from './../../../../data/services/auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { UserService } from 'src/app/data/services/user/user.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public user$: Observable<User>;
  public userApps$: Observable<App[]>;
  public timer$: BehaviorSubject<string>;
  public currentUser: UserToken;

  private unsubscribe$: Subject<Boolean> = new Subject();

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.subscribeToCurrentLoggedInUser();
    if (this.currentUser) {
      this.user$ = this.userService.getUser(this.currentUser.identificationNumber);
      this.userApps$ = this.userService.getUserApps(this.currentUser.identificationNumber);
    }

    // Maintain the session timer.
    let loginEpoch: number;
    const loginEpochRaw = localStorage.getItem('lt');
    if (!!loginEpochRaw && (Number(loginEpochRaw) > 0) && (Number(loginEpochRaw) <= Date.now())) {
      loginEpoch = Number(loginEpochRaw);
    } else {
      loginEpoch = Date.now();
    }
    const msElapsed = Date.now() - loginEpoch;
    let timeLeft = (environment.SESSION_TIME*60) - (msElapsed/1000);
    // Do a little safety check to make sure time left is always positive.
    if (timeLeft < 0) {
      timeLeft = 1;
    }
    setTimeout(() => {
      this.logout();
    }, (Math.floor(timeLeft)*1000));
  }

  private subscribeToCurrentLoggedInUser() {
    this.authService.currentUser$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(data => {
      if (data) {
        this.currentUser = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }

  public logout() {
    this.authService.logoutCurrentUser();
    this.router.navigate(['/login']);
  }
}
