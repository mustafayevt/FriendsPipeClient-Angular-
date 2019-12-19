import { Component, OnInit } from '@angular/core';
import { PostService } from '../Services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public Posts = [
    { 'id': 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" },
    { "id": 3, "name": "Tural" }
  ]
  constructor() { 
    
  }

  ngOnInit() {
  }

}
