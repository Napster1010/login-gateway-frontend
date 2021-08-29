import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private httpClient: HttpClient) { }

  public generateNewRegistrationOtp(identificationNumber: string) {
    const url = `${environment.REGISTRATION.GENERATE_OTP}/${identificationNumber}`;
    return this.httpClient.post<void>(url, {});
  }

  public finalizeRegistration(identificationNumber: string, otp: string) {
    const url = environment.REGISTRATION.FINALIZE;
    const requestBody = {
      identificationNumber,
      otp
    };
    const requestOptions: Object = {
      responseType: 'text'
    };
    return this.httpClient.post<string>(url, requestBody, requestOptions);
  }

}
