import { User } from '../../schemas/User';
import { LoginRequest } from './../../schemas/LoginRequest';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _currentUser = new BehaviorSubject<User | null>(null);
  public readonly currentUser$: Observable<User | null> = this._currentUser.asObservable();

  constructor(private authApiService: AuthApiService, private jwtHelperService: JwtHelperService) { }

  public loginUser(loginRequest: LoginRequest): Observable<string> {
    return this.authApiService.loginUser(loginRequest).pipe(
      map(response => {
        const authToken = response.headers.get('Authorization');
        if (authToken == null) {
          throw new Error('No authentication token provided in response!');
        }
        return authToken;
      })
    );
  }

  public storeUserAuthToken(authToken: string) {
    // Store auth token and start the session timer.
    localStorage.setItem('timer', (environment.SESSION_TIME * 60).toString());
    localStorage.setItem('currentUser', authToken);
  }

  public syncCurrentUser() {
    const authToken = this.getCurrentUserAuthToken();
    if (authToken) {
      this._currentUser.next(this.getDecodedUserAuthToken(authToken));
    }
  }

  private getDecodedUserAuthToken(authToken: string): User {
    const decodedToken = this.jwtHelperService.decodeToken(authToken);
    return {
      identificationNumber: decodedToken.sub,
      name: decodedToken.name
    };
  }

  public getCurrentUserAuthToken(): string | null {
    return localStorage.getItem('currentUser');
  }

  public isCurrentUserLoggedIn(): boolean {
    const authToken = this.getCurrentUserAuthToken();
    if (!authToken) {
      return false;
    }
    return !this.jwtHelperService.isTokenExpired(authToken);
  }

  public logoutCurrentUser() {
    this.authApiService.logoutUser()
      .pipe(take(1))
      .subscribe(() => {
        console.log('User logged out succeefully!');
      });

    localStorage.removeItem('currentUser');
  }
}
