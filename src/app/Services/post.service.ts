import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(_httpClient: HttpClient) {
    _httpClient.get(environment.baseUrl + '/api/posts');
  }
}
