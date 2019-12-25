import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../DTOs/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl + 'api/';

  constructor(private _httpClient: HttpClient) { }

  getRandomUsers(UserCount: number): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.baseUrl}userfollow/getrandomuser?userCount=${UserCount}`);
  }

  getNotFollowedUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.baseUrl}userfollow/getrandomuser`);
  }
  getFollowingUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.baseUrl}userfollow/getfollowings`);
  }

  addFollow(followUserName: string): Observable<number> {
    return this._httpClient.post<number>(`${this.baseUrl}userfollow/addfollow?followUserName=${followUserName}`, null);
  }
}
