import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Register } from '../models/Identity/register';
import { Login } from '../models/Identity/login';
import { ChangePassword } from '../models/Identity/changepassword';
import { ForgotPassword } from '../models/Identity/forgotpassword';
import { Observable } from 'rxjs';
import { CodeLookUpResponse } from '../models/LookUp/codelookupresponse';
import { UserResponse } from '../models/User/userresponse';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {

  baseUrl: String = '';
  constructor(private httpClient: HttpClient) {
      this.processBaseUrl();
  }

  processBaseUrl() {
    console.log("Web app host URL" + window.location.origin);
    if(window.location.origin == "http://localhost:4200"){
        this.baseUrl = "http://localhost:5006/api/Identity";
    } else {
        this.baseUrl = "http://mi.frand.net/api/Identity";
    }
    console.log("API host URL: " + this.baseUrl);
  }

  public login(login: Login) {
    let body = new URLSearchParams();
    body.set('identifier', login.username);
    body.set('password', login.password);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(this.baseUrl + '/Login', body, options);
  }

  public register(register: Register) {
    return this.httpClient.post(this.baseUrl + '/Register', register);
  }

  public getCredentialTypes(): Observable<CodeLookUpResponse> {
    return this.httpClient.get<CodeLookUpResponse>(this.baseUrl + '/GetCredentialTypes');
  }

  public getCodeTypeLookUps(): Observable<CodeLookUpResponse> {
    return this.httpClient.get<CodeLookUpResponse>(this.baseUrl + '/GetCodeTypeLookUps');
  }

  public getCodeLookUps(codeTypeLookUp : string): Observable<CodeLookUpResponse> {
    return this.httpClient.get<CodeLookUpResponse>(this.baseUrl + '/GetCodeLookUps/' + codeTypeLookUp);
  }

  public logout() {
    return this.httpClient.get(this.baseUrl + '/Logout');
  }

  public forgotPassword(forgot: ForgotPassword) {
    return this.httpClient.post(this.baseUrl + '/entity/ForgotPassword', forgot);
  }

  public changePassword(changepassword: ChangePassword) {
    return this.httpClient.put(this.baseUrl + '/ChangePassword', changepassword);
  }

  public getUserDetails(userId: string): Observable<UserResponse> {
    return this.httpClient.get<UserResponse>(this.baseUrl + '/GetUserDetails/' + userId);
  }  

}
