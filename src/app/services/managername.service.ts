import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

 

@Injectable({
  providedIn: 'root',
})
export class ManagernameService {
  private managerNameUrl = 'http://localhost:9000/skill'; // Update the URL to match your backend API URL

  private finalizedQuestions: any[] = [];

  private duration!: number;

  private cutoff!: number;

  private SelectedManager: any;
  
  private fileName!: string;

  constructor(private http: HttpClient) {}

  getManagerNames(): Observable<any> {
    const endpoint = `${this.managerNameUrl}/getmanagername`;

    return this.http.get<any>(endpoint);
  }

  postManagerList(name: String): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { Managername: name };
    return this.http.post<any>(this.managerNameUrl + '/select-manager', body, {
      headers,
    });
  }

  postexistingcandidates(
    managername: string,
    name: string[],
    email: string,
    phone: number,
    status: string,
    filename: string,
    questions: any
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      email_Managername: managername,
      candidateName: name,
      candidateEmail: email,
      candidatePhone: phone,

      email_Status: status,
      email_Filename: filename,
      questions: questions,
    };
    return this.http.post<any>(this.managerNameUrl + '/add-candidate', body, {
      headers,
    });
  }

  //candidate list

  getCandidateStatus(): Observable<any> {
    const endpoint = `${this.managerNameUrl}/existingcandidate`;
    return this.http.get<any>(endpoint);
  }

  setFinalizedQuestions(questions: any[]): void {
    this.finalizedQuestions = questions;
  }

  getFinalizedQuestions(): any[] {
    return this.finalizedQuestions;
  }

  setDuration(duration: number) {
    this.duration = duration;
  }

  getDuration() {
    return this.duration;
  }

  setCutoff(cutoff: number) {
    this.cutoff = cutoff;
  }

  getCutoff() {
    return this.cutoff;
  }

  setManagerName(name: any) {
    this.SelectedManager = name;
  }

  getManagerName(): any {
    return this.SelectedManager;
  }
  setFileName(fileName: string) {
    this.fileName = fileName;
  }

  getFileName(): string {
    return this.fileName;
  }
}