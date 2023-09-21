import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private skillsUrl = 'http://localhost:9000/skill';

  // private apiUrl = 'http://localhost:9000/skill'

  constructor(private http: HttpClient) {}

  getManagerNames(): Observable<any> {
    const endpoint = `${this.skillsUrl}/getmanagername`;

    return this.http.get<any>(endpoint);
  }

  postManagerList(name: String): Observable<any> {
    console.log('name', name);

    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { ManagerName: name };

    return this.http.post<any>(this.skillsUrl + '/select-manager', body, {
      headers,
    });
  }

  getExistingData(): Observable<any> {
    const endpoint = `${this.skillsUrl}/existinguser`;

    return this.http.get<any[]>(endpoint);
  }

  getskillsList(): Observable<any> {
    return this.http.get<any>(this.skillsUrl + '/getskill');
  }

  // Method to fetch data by fileName and Managername
  getdataby_FileName(Managername: string, fileName: string): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { Managername: Managername, fileName: fileName };
    return this.http.post<any>(this.skillsUrl + '/viewdata', body, {
      headers,
    });
  }

  //sending view data to questiondisplay component
  getFinalizedQuestions(): Observable<any> {
    return this.http.get<any[]>(this.skillsUrl + '/view_fetchData');
  }

  getExistingCandidate(): Observable<any> {
    return this.http.get<any>(this.skillsUrl + '/existingcandidate');
  }
  //New User
  postCandidateDetails(
    managerName: String,
    name: String,
    emailId: String,
    phoneNumber: Number,
    status: String,
    fileName: String,
    questions: any
  ): Observable<any> {
    console.log('name', name);

    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {
      email_Managername: managerName,
      candidateName: name,
      candidateEmail: emailId,

      candidatePhone: phoneNumber,
      email_Status: status,
      email_Filename: fileName,
      questions: questions,
    };

    return this.http.post<any>(this.skillsUrl + '/add-candidate', body, {
      headers,
    });
  }
  //Post the data of Existing Candidates
  postExistingCandidateDetails(
    managerName: string,
    candidateName: string,
    candidateEmail: string,
    candidatePhone: number,
    status: string,
    fileName: string,
    questions: any
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {
      email_Managername: managerName,
      candidateName: candidateName,
      candidateEmail: candidateEmail,
      candidatePhone: candidatePhone,
      email_Status: status,
      email_Filename: fileName,
      questions: questions,
    };

    return this.http.post<any>(this.skillsUrl + '/add-candidate', body, {
      headers,
    });
  }
}
