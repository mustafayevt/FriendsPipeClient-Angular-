import { Component, OnInit } from '@angular/core';
import { PostService } from '../Services/post.service';
import { Post } from '../DTOs/Post';

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
  }

  ngOnInit() {
  }

  addPost() {
    this._postService.addPost(this.NewPost).subscribe(data => alert(data), error => {
      alert('Something went Wrong');
    })
  }
}
