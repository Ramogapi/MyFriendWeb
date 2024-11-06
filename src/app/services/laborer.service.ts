import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Qualification } from '../models/User/Qualification/qualification';
import { Skill } from '../models/User/Skill/skill';
import { Observable } from 'rxjs';
import { UserQualifications } from '../models/User/Qualification/userqualifications';
import { UserQualification } from '../models/User/Qualification/userqualification';
import { UserSkill } from '../models/User/Skill/userskill';
import { UserSkills } from '../models/User/Skill/userskills';

@Injectable({
  providedIn: 'root'
})
export class LaborerService {

  baseUrl: String = '';
  constructor(private httpClient: HttpClient) {
      this.processBaseUrl();
  }

  processBaseUrl() {
    console.log("Web app host URL" + window.location.origin);
    if(window.location.origin == "http://localhost:4200"){
        this.baseUrl = "https://localhost:7179/api/Laborer";
    } else {
        this.baseUrl = "https://mi.frand.net/api/Laborer";
    }
    console.log("API host URL: " + this.baseUrl);
  }

  public getQualification(id: number): Observable<UserQualification> {
    return this.httpClient.get<UserQualification>(this.baseUrl + '/GetQualification/' + id);
  }

  public getQualifications(userId: string): Observable<UserQualifications> {
    return this.httpClient.get<UserQualifications>(this.baseUrl + '/GetQualifications/' + userId);
  }

  public createQualification(model: Qualification) {
    return this.httpClient.post(this.baseUrl + '/CreateQualification', model);
  }

  public updateQualification(model: Qualification) {
    return this.httpClient.put(this.baseUrl + '/UpdateQualification', model);
  }

  public deleteQualification(id: number) {
    return this.httpClient.delete(this.baseUrl + '/DeleteQualification/' + id);
  }

  public getSkill(id: number): Observable<UserSkill> {
    return this.httpClient.get<UserSkill>(this.baseUrl + '/GetSkillProfession/' + id);
  }

  public getSkills(userId: string): Observable<UserSkills> {
    return this.httpClient.get<UserSkills>(this.baseUrl + '/GetSkillProfessions/' + userId);
  }

  public createSkill(model: Skill) {
    return this.httpClient.post(this.baseUrl + '/CreateSkillProfession', model);
  }

  public updateSkill(model: Skill) {
    return this.httpClient.put(this.baseUrl + '/UpdateSkillProfession', model);
  }

  public deleteSkill(id: number) {
    return this.httpClient.delete(this.baseUrl + '/DeleteSkillProfession/' + id);
  }

}
