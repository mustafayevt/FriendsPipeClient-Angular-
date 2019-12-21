import { Component, OnInit } from '@angular/core';
import { PostService } from '../Services/post.service';
import { Post } from '../DTOs/Post';
import Notiflix from 'notiflix-angular/dist/notiflix-angular-1.1.0';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public Posts: Post[];
  public NewPost: string;
  constructor(private _postService: PostService) {
    _postService.getposts().subscribe(data => this.Posts = data);
    Notiflix.Notify.Init({
      width: '300px',
      timeout: 5000,
      position: 'right-bottom',
      cssAnimationStyle: 'from-bottom',
      distance: '15px'
    });
  }

  ngOnInit() {
  }

  addPost() {
    this._postService.addPost(this.NewPost).subscribe(data => {
      this.NewPost = '';
      this.Posts.push(data);
      Notiflix.Notify.Success('Post Added');
    }, error => {
      Notiflix.Notify.Failure('Something Went Wrong');

    });
  }
}
