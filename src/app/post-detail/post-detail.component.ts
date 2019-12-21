import { Component, OnInit } from '@angular/core';
import { PostService } from '../Services/post.service';
import { Post } from '../DTOs/Post';
import { ActivatedRoute } from '@angular/router';
import Notiflix from 'notiflix-angular/dist/notiflix-angular-1.1.0';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: Post;
  newComment: string;
  constructor(private _postService: PostService, private route: ActivatedRoute) {
    Notiflix.Notify.Init({
      width: '300px',
      timeout: 5000,
      position: 'right-bottom',
      cssAnimationStyle: 'from-bottom',
      distance: '15px'
    });
   }

  ngOnInit() {
    this.route.params.subscribe(
      id => this._postService.getPost(id.id).subscribe(data => this.post = data));
  }
  addComment() {
    this._postService.addComment(this.post.id, this.newComment).subscribe(data => {
      this.newComment = '';
      this.post.comments.push(data);
      // this.post.comments.sort((a: Comment, b: Comment) => {
      //   return this.getTime(a.commentDate) - this.getTime(b.commentDate);
      // });
      Notiflix.Notify.Success('Comment Added');

    }, error => {
      Notiflix.Notify.Failure('Something Went Wrong');

    });
  }

  private getTime(date?: Date) {
    return date != null ? date.getTime() : 0;
  }

}
