import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillsdropdownService {
  private skillsUrl = 'http://localhost:9000/skill';
  private Skill: any[] = [];

  constructor(private http: HttpClient) {}

  getskillsList(): Observable<any> {
    return this.http.get<any>(this.skillsUrl + '/getskill');
  }

  postskillsList(Skills: string[]): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { selectedSkill: Skills };

    return this.http.post<any>(this.skillsUrl + '/questionfind', body, {
      headers,
    });
  }

  filterManager(
    filterManager: string | undefined,
    filterSkills: string | string[] | undefined
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { filterManager, filterSkills };

    console.log('body', body);

    return this.http.post<any>(this.skillsUrl + '/search', body, { headers });
  }

  //post questions,cuttoff,duration
  postquestions(dataToSave: any): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    //  const body = {
    //    Questions: ques.Questions,
    //    cutoff:ques.cuttoff,
    //    duration:ques.duration
    //   }
    //console.log("body:",body);

    return this.http.post<any>(
      this.skillsUrl + '/questions',
      { ques: dataToSave },
      { headers }
    );
  }

  updatequestions(
    Managername: string,

    fileName: string,

    questions: any[], // Replace 'any[]' with the actual type of your questions

    duration: number,

    cutoff: number
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    //  const body = {

    //    Questions: ques.Questions,

    //    cutoff:ques.cuttoff,

    //    duration:ques.duration

    //   }

    //console.log("body:",body);

    const data = {
      Managername,

      fileName,

      questions,

      cutoff,

      duration
    };

    console.log('dt', data);

    return this.http.post<any>(
      this.skillsUrl + '/edit_questions',

      data,

      { headers }
    );
  }

  // Function to get the latest version
  getLatestVersion(Managername: string, Skill: string[]): Observable<number> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { Managername, Skill };

    return this.http.post<number>(this.skillsUrl + '/latest-version', body, {
      headers,
    });
  }

  //Editicon

  getDash1Data(
    selectedSkill: string[],
    FinalizedQuestions: string[]
  ): Observable<any> {
    const queryParams = {
      selectedSkill: JSON.stringify(selectedSkill),
      selectedQuestions: JSON.stringify(FinalizedQuestions),
    };

    return this.http.get('/dash1', { params: queryParams });
  }

  setSkill(Skill: any[]): void {
    this.Skill = Skill;
  }

  getSkill(): any[] {
    return this.Skill;
  }
}
