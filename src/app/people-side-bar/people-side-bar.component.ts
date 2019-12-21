import { Component, OnInit } from '@angular/core';
import { User } from '../DTOs/User';
import { UserService } from '../Services/user.service';
import Notiflix from 'notiflix-angular/dist/notiflix-angular-1.1.0';

@Component({
  selector: 'app-people-side-bar',
  templateUrl: './people-side-bar.component.html',
  styleUrls: ['./people-side-bar.component.css']
})
export class PeopleSideBarComponent implements OnInit {
  randomUsers: User[];
  getRandom() {
    this._userService.getRandomUsers(6).subscribe(data => {
      this.randomUsers = data;
    });
  }
  constructor(private _userService: UserService) {
    this.getRandom();
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



  follow(followTo: string) {
    this._userService.addFollow(followTo).subscribe(response => {
      if (response === 1) {
        Notiflix.Notify.Success('Successful');
        this.getRandom();
      }
    });
  }
}
