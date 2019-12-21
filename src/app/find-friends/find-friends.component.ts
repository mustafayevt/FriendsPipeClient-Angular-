import { Component, OnInit } from '@angular/core';
import { User } from '../DTOs/User';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-find-friends',
  templateUrl: './find-friends.component.html',
  styleUrls: ['./find-friends.component.css']
})
export class FindFriendsComponent implements OnInit {
  randomUsers: User[];

  constructor(private _userService: UserService) { 
    this._userService.getRandomUsers(6).subscribe(data => {
      this.randomUsers = data;
    });
   }

  ngOnInit() {
  }

}
