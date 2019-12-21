import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../DTOs/User';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../DTOs/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl = environment.baseUrl;

  constructor(private _httpClient: HttpClient) {
  }
  getposts(): Observable<Post[]> {
    return this._httpClient.get<Post[]>(`${this.baseUrl}post/posts`);
  }
  getPost(PostId: number): Observable<Post> {
    return this._httpClient.get<Post>(`${this.baseUrl}post/postdetail?PostId=${PostId}`);
  }

  addComment(PostId: number, Comment: string): Observable<Comment> {
    return this._httpClient.post<Comment>(`${this.baseUrl}post/addcomment?PostId=${PostId}&Comment=${Comment}`, null);
  }

  addPost(NewPost: string): Observable<Post> {
    return this._httpClient.post<Post>(`${this.baseUrl}post/addpost?newPost=${NewPost}`, null);
  }
}
