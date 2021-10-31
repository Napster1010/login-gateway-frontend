import { AuthService } from './../auth/auth.service';
import { Observable } from 'rxjs';
import { App } from './../../schemas/App';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  public getUserApps(identificationNumber: string): Observable<App[]> {
    const url = environment.USER_APPS_API + identificationNumber;
    return this.httpClient.get<App[]>(url);
  }
}
