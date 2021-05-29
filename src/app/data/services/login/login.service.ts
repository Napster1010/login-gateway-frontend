import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../../schemas/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  public loginUser(loginRequest: LoginRequest): Observable<void> {
    return this.httpClient.post<void>(environment.LOGIN_URL, loginRequest);
  }
}
