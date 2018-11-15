import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private apiUrl = "../../assets/json/members.json";
  constructor(public http: HttpClient) {
  }

  getMembers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

}
