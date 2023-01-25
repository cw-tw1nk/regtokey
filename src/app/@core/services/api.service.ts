import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from '../data/questionnaire/question';
import { PageData, Project, ProjectAnswer, ProjectResult, ProjectData } from '../data/project';
import { HttpClient } from '@angular/common/http';
import { Questionnaire } from '../data/questionnaire/questionnaire';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly localhost_api = `//localhost:8083/api`;
  private readonly api = environment.api;
  constructor(private http: HttpClient) {}

  getQuestion(id: string): Observable<ProjectData> {
    return this.http.get<ProjectData>(`${this.api}/project/`, {headers: {'Authorization': `Bearer ${id}`}});
  }

  next(id: string, answer: ProjectAnswer): Observable<ProjectData> {
    return this.http.post<ProjectData>(`${this.api}/project/`, answer, {headers: {'Authorization': `Bearer ${id}`}})
  }

  back(id: string): Observable<ProjectData> {
    return this.http.get<ProjectData>(`${this.api}/project/back`, {headers: {'Authorization': `Bearer ${id}`}})
  }

  skip(id: string): Observable<ProjectData> {
    return this.http.get<ProjectData>(`${this.api}/project/skip`, {headers: {'Authorization': `Bearer ${id}`}})
  }


  info(invite: string): Observable<Questionnaire> {
    return this.http.get<Questionnaire>(`${this.api}/invite/${invite}/info`, {})
  }

  createProject(invite: string): Observable<Project> {
    return this.http.get<Project>(`${this.api}/invite/${invite}`, {})
  }
}
