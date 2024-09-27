import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:3000/animeProfile/';

  getProfiles(): Observable<any> {
    return this.http.get(this.url);
  }

  addProfile(profile: any, index: number): Observable<any> {
    return this.http.post(this.url, profile);
  }

  removeProfile(profile: any) {
    return this.http.delete(this.url + profile);
  }
}
