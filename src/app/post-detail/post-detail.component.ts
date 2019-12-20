import { Component, OnInit } from '@angular/core';
import { PostService } from '../Services/post.service';
import { Post } from '../DTOs/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  constructor(private _postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      id => this._postService.getPost(id.id).subscribe(data => this.post = data));
  }


}
