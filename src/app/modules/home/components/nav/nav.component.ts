import { take, takeUntil } from 'rxjs/operators';
import { AuthService } from './../../../../data/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, interval, Subject } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  public ngUnsubcribe$: Subject<boolean> = new Subject();
  public timer$: BehaviorSubject<string>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    let currentTimer: number;
    const timerString = localStorage.getItem('timer');
    if (!!timerString && (Number.parseInt(timerString) > 0)) {
      currentTimer = Number.parseInt(timerString);
    } else {
      currentTimer = Date.now();
    }

    interval(1000).pipe(
      take(currentTimer),
      takeUntil(this.ngUnsubcribe$)
    ).subscribe((timerVal) => {
      localStorage.setItem('timer', (currentTimer - timerVal - 1).toString());
    });

    setTimeout(() => {
      this.logout();
    }, currentTimer*1000);
  }

  ngOnDestroy(): void {
    this.ngUnsubcribe$.next(true);
  }

  public logout() {
    this.authService.logoutCurrentUser();
    this.router.navigate(['/login']);
  }

}
