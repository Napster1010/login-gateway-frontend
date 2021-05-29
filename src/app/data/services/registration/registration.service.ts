import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  public registerNewUser(identificationNumber: string) {
    const requestOptions: Object = {
      responseType: 'text'
    };
    return this.httpClient.post<string>(environment.REGISTRATION_URL, {
      identificationNumber
    }, requestOptions);
  }

}
