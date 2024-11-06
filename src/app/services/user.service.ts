import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { UserAddress } from '../models/User/useraddress';
import { BankCard } from '../models/User/BankCard/bankcard';
import { FeedBack } from '../models/User/feedback';
import { UserVerify } from '../models/User/Verify/userverify';
import { UserVerifyUpload } from '../models/User/Verify/userverifyupload';
import { UserUploads } from '../models/User/UserUpload/useruploads';
import { UserBankCards } from '../models/User/BankCard/userbankcards';
import { UserUploadRequest } from '../models/User/UserUpload/useruploadrequest';
import { UserBankCard } from '../models/User/BankCard/userbankcard';
import { UserUpload } from '../models/User/UserUpload/userupload';
import { Interest } from '../models/User/Interest/interest';
import { CodeLookUpResponse } from '../models/LookUp/codelookupresponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: String = '';
  constructor(private httpClient: HttpClient) {
      this.processBaseUrl();
  }

  processBaseUrl() {
    console.log("Web app host URL" + window.location.origin);
    if(window.location.origin == "http://localhost:4200"){
        this.baseUrl = "https://localhost:7251/api/User";
    } else {
        this.baseUrl = "https://mi.frand.net/api/User";
    }
    console.log("API host URL: " + this.baseUrl);
  }

  public getAddress(userId: string) {
    return this.httpClient.get(this.baseUrl + '/GetAddress/' + userId);
  }

  public createAddress(model: UserAddress) {
    return this.httpClient.post(this.baseUrl + '/CreateAddress', model);
  }

  public updateAddress(model: UserAddress) {
    return this.httpClient.put(this.baseUrl + '/UpdateAddress', model);
  }

  public downloadUserUpload(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl + '/DownloadUserUpload/' + id, { responseType: 'blob' });
  }

  public deleteAddress(id: number) {
    return this.httpClient.delete(this.baseUrl + '/DeleteAddress/' + id);
  }

  public createBankCard(model: BankCard) {
    return this.httpClient.post(this.baseUrl + '/CreateBankCard', model);
  }

  public updateBankCard(model: BankCard) {
    return this.httpClient.put(this.baseUrl + '/UpdateBankCard', model);
  }

  public createUserUpload(model: UserUploadRequest) {
    let form: FormData = new FormData();
    form.append('Upload.Data', model.upload);
    form.append('UserId', model.userId);
    form.append('TypeCode', model.typeCode);
    return this.httpClient.post(this.baseUrl + '/CreateUserUpload', form);
  }

  public deleteUserUpload(id: number) {
    return this.httpClient.delete(this.baseUrl + '/DeleteUserUpload/' + id);
  }

  public deleteBankCard(id: number) {
    return this.httpClient.delete(this.baseUrl + '/DeleteBankCard/' + id);
  }

  public submitFeedBack(model: FeedBack) {
    return this.httpClient.post(this.baseUrl + '/SubmitFeedBack', model);
  }

  public createUserVerify(model: UserVerify) {
    return this.httpClient.post(this.baseUrl + '/CreateUserVerify', model);
  }

  public getDefendantVerifies(defendantId: string) {
    return this.httpClient.get(this.baseUrl + '/GetDefendantVerifies/' + defendantId);
  }

  public getUserUploads(userId: string): Observable<UserUploads> {
    return this.httpClient.get<UserUploads>(this.baseUrl + '/GetUserUploads/' + userId);
  }

  public getBankCard(id: number): Observable<UserBankCard> {
    return this.httpClient.get<UserBankCard>(this.baseUrl + '/GetBankCard/' + id);
  }

  public getBankCards(userId: string): Observable<UserBankCards> {
    return this.httpClient.get<UserBankCards>(this.baseUrl + '/GetBankCards/' + userId);
  }

  public downloadUserVerifyUpload(id: number) {
    return this.httpClient.get(this.baseUrl + '/DownloadUserVerifyUpload/' + id);
  }

  public createUserVerifyUpload(model: UserVerifyUpload) {
    return this.httpClient.post(this.baseUrl + '/CreateUserVerifyUpload', model);
  }

  public getUserUpload(userId: string, typeCode: string): Observable<UserUpload> {
    return this.httpClient.get<UserUpload>(this.baseUrl + '/GetUserUpload/userId=' + userId + '&typeCode=' + typeCode);
  }

  public createUserInterests(model: Interest) {
    return this.httpClient.post(this.baseUrl + '/CreateUserInterests', model);
  }

  public getUserInterests(userId: string): Observable<CodeLookUpResponse> {
    return this.httpClient.get<CodeLookUpResponse>(this.baseUrl + '/GetUserInterests/' + userId);
  }

  public deleteUserInterest(id: number) {
    return this.httpClient.delete(this.baseUrl + '/DeleteUserInterest/' + id);
  }

}
