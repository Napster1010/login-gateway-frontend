import { App } from './../../../../data/schemas/App';
import { AuthService } from './../../../../data/services/auth/auth.service';
import { User } from './../../../../data/schemas/User';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { UserService } from 'src/app/data/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public currentUser: User | null;
  public userApps$: Observable<App[]>;

  private unsubscribe$: Subject<Boolean> = new Subject();

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.subscribeToCurrentLoggedInUser();
    if (this.currentUser) {
      this.userApps$ = this.userService.getUserApps(this.currentUser?.identificationNumber);
    }
  }

  private subscribeToCurrentLoggedInUser() {
    this.authService.currentUser$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(data => this.currentUser = data);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
  }
}
