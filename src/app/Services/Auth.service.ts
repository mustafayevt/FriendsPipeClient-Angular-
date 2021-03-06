import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../DTOs/User';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RefreshAccessToken } from '../DTOs/RefreshAccessToken';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl + 'api/';
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  public loggedUser: string;

  constructor(private http: HttpClient) { this.loggedUser = this.getUserName(); }

  login(user: User): Observable<boolean> {
    return this.http.post<RefreshAccessToken>(`${this.baseUrl}auth/signin`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true));
  }
  signup(user: User): Observable<boolean> {
    return this.http.post<RefreshAccessToken>(`${this.baseUrl}auth/signup`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true));
  }

  logout() {
    return this.http.post<User>(`${this.baseUrl}auth/logout`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        this.doLogoutUser();
        console.log(error.error);
        return of(false);
      }));
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(`${this.baseUrl}auth/refreshtoken`, {
      'refreshToken': this.getRefreshToken(),
      'accessToken': this.getJwtToken()
    }).pipe(tap((tokens: RefreshAccessToken) => {
      this.storeTokens(tokens);
      window.location.reload();
    }, (e) => {
      this.doLogoutUser();
      window.location.reload();
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }
  getUserName() {
    return localStorage.getItem('UserName');
  }

  private doLoginUser(username: string, tokens: RefreshAccessToken) {
    this.loggedUser = username;
    this.storeUserName(username);
    this.storeTokens(tokens);
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeUserName(userName: string) {
    localStorage.setItem('UserName', userName);
  }

  private storeTokens(tokens: RefreshAccessToken) {
    localStorage.setItem(this.JWT_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem('UserName');
  }
}
