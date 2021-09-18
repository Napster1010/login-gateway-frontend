import { LoginRequest } from './../../schemas/LoginRequest';
import { Observable } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    localStorage.setItem('currentUser', authToken);
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
}
