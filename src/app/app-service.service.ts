import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {


  private managerNameUrl = " postmanlink here "
  constructor(private http: HttpClient) { }

getmanagerName() : Observable<any>{
  return this.http.get(`${this.managerNameUrl}`);
}



  // getData(){ [vid1]
  //  return this.http.get('/api/getData')
  // }[vid1]


}
