import { Component, OnInit, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import { MessengerService } from '../Services/Messenger.service';
import { User } from '../DTOs/User';
import { UserService } from '../Services/user.service';
import * as signalR from '@aspnet/signalr';
import { MessengerUser } from '../DTOs/MessengerUser';
import { AuthService } from '../Services/Auth.service';
import { MessageDto } from '../DTOs/Message';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  connectedUsers: MessengerUser[] = new Array<MessengerUser>();
  baseUrl = environment.baseUrl;
  connection: HubConnection;
  hubAddress = `${this.baseUrl}messenger`;
  selectedUser: MessengerUser;
  newMessage: MessageDto = new MessageDto('', false);
  text: string;

  selectChat(chat: MessengerUser) {
    this.selectedUser = chat;
    this.selectedUser.unreadedMessages = 0;
  }

  getUsers() {
    this.connection.on('GetUsers', (Users: Array<MessengerUser>) => {
      this.connectedUsers = Users;
    });
  }
  getNewUser() {
    this.connection.on('NewUserConnected', (newUser: MessengerUser) => {
      //console.log(newUser);
      if (!this.connectedUsers.includes(newUser)) {
        this.connectedUsers.push(newUser);
      }
    });
  }
  getNewMessage() {
    this.connection.on('NewMessage', (newMessage: MessageDto) => {
      this.connectedUsers[this.connectedUsers.findIndex(e => e.connectionId === newMessage.senderId)].messages.push(newMessage);
      if (this.selectedUser == undefined || newMessage.senderId != this.selectedUser.connectionId) {

        this.connectedUsers[this.connectedUsers.findIndex(e => e.connectionId === newMessage.senderId)].unreadedMessages++;
      }
    });
  }

  userDisconnected() {
    this.connection.on('UserDisconnected', (disconnectedUser: MessengerUser) => {
      this.connectedUsers = this.connectedUsers.filter(item => item.userName !== disconnectedUser.userName);
    });
  }

  ngOnDestroy() {
    this.connection.stop();
  }

  constructor(private _authService: AuthService) {
    this.connection = new HubConnectionBuilder().withUrl(this.hubAddress, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
      accessTokenFactory: () => _authService.getJwtToken()
    }).build();

    this.connection.start().then(() => {

      this.getUsers();
      this.getNewUser();
      this.userDisconnected();
      this.getNewMessage();
    });
    console.log('asdfsdfsdfsdfsdf');
  }
  sendMessage() {
    this.selectedUser.messages.push(new MessageDto(this.newMessage.message, this.newMessage.isIncoming));
    // this.newMessage.message = this.newTextMessage;
    this.connection.invoke('NewMessage', this.selectedUser.connectionId, this.newMessage.message);
    this.newMessage.message = '';
  }
  ngOnInit() {
  }

}
