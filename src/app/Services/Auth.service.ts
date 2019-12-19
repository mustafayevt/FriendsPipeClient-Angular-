import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../DTOs/User';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RefreshAccessToken } from '../DTOs/RefreshAccessToken';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {}

  login(user: User): Observable<boolean> {
    return this.http.post<RefreshAccessToken>(`${this.baseUrl}auth/signin`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.Username, tokens)),
        mapTo(true));
  }
  signup(user: User): Observable<boolean> {
    return this.http.post<RefreshAccessToken>(`${this.baseUrl}auth/signup`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.Username, tokens)),
        mapTo(true),
        catchError(error => {
          console.log(error.error);
          return of(false);
        }));
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
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens: RefreshAccessToken) => {
      this.storeJwtToken(tokens.accessToken);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: RefreshAccessToken) {
    console.log(tokens);
    this.loggedUser = username;
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

  private storeTokens(tokens: RefreshAccessToken) {
    localStorage.setItem(this.JWT_TOKEN, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
  }

  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
