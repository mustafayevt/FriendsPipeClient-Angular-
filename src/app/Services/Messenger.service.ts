
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {
  baseUrl = environment.baseUrl;
  connection: HubConnection;
  hubAddress = `${this.baseUrl}/messenger`;
  constructor() {
    this.connection = new HubConnectionBuilder().withUrl(this.hubAddress, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    }).build();

  }

  sendMessage(message: string) {
    this.connection.invoke('NewMessage', message);
  }
}
