import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserActivityLogService {

  constructor(private httpClient: HttpClient) { }

  public updateAppNavigationActivity(appId: number): Observable<void> {
    return this.httpClient.post<void>(`${environment.UPDATE_APP_NAVIGATION_ACTIVITY_API}${appId}`, {});
  }
}
