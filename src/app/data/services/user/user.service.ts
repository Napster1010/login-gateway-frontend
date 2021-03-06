import { User } from './../../schemas/User';
import { Observable } from 'rxjs';
import { App } from './../../schemas/App';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUser(identificationNumber: string): Observable<User> {
    const url = environment.USER_API + identificationNumber;
    return this.httpClient.get<User>(url);
  }

  public getUserApps(identificationNumber: string): Observable<App[]> {
    const url = environment.USER_APPS_API + identificationNumber;
    return this.httpClient.get<App[]>(url);
  }
}
