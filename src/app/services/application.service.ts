import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  baseUrl: String = '';
  constructor(private httpClient: HttpClient) {
      this.processBaseUrl();
  }

  processBaseUrl() {
    console.log("Web app host URL" + window.location.origin);
    if(window.location.origin == "http://localhost:4200"){
        this.baseUrl = "https://localhost:7179/api/Application";
    } else {
        this.baseUrl = "https://mi.frand.net/api/Application";
    }
    console.log("API host URL: " + this.baseUrl);
  }
}
