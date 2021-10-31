import { Observable } from 'rxjs';
import { LoginRequest } from './../../schemas/LoginRequest';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(private httpClient: HttpClient) { }

  public loginUser(loginRequest: LoginRequest): Observable<HttpResponse<void>> {
    return this.httpClient.post<void>(environment.LOGIN_API, loginRequest, {
      observe: 'response'
    });
  }

  public logoutUser(): Observable<void> {
    return this.httpClient.post<void>(environment.LOGOUT_API, {});
  }

}
