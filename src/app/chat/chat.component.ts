import { Component, OnInit, Input } from '@angular/core';
import { MessengerUser } from '../DTOs/MessengerUser';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() ChatUser: MessengerUser;
  constructor() {
    console.log(this.ChatUser);
  }

  ngOnInit() {
  }

}
