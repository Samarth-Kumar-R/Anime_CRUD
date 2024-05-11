import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  // profile = [
  //   {
  //     name: 'Goku',
  //     image:
  //       'https://dragonball.guru/wp-content/uploads/2021/01/goku-dragon-ball-guru.jpg',
  //     anime: 'Dragon Ball',
  //   },
  // ];

  url = 'http://localhost:3000/animeProfile';

  getProfiles(): Observable<any> {
    return this.http.get(this.url);
  }

  addProfile(profile: any, index: Number): Observable<any> {
    return this.http.post(this.url, profile);
  }

  removeProfile(profile: any, index: Number) {
    return this.http.delete(this.url + '/' + profile.id);
  }
}
