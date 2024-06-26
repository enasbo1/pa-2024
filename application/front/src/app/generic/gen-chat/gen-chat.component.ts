import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ChatObject} from "../../shared/foundation/chat/chatObject";
import {UserRecap} from "../../http/model/user-model/userObject";

@Component({
  templateUrl: './gen-chat.component.html',
  styleUrls: ['./gen-chat.component.scss']
})
export class GenChatComponent implements OnInit {
  receiver:UserRecap = {
    id: 1n,
    prenom: "reciever",
    nom:'reciever'

  }

  sender:UserRecap = {
    id: 2n,
    prenom: "sender",
    nom:'sender'
  }

  messages:ChatObject[] = [
    { content: 'Message 4', user: this.receiver, date: new Date('2024-04-15T11:00:00') },
    { content: 'Message 8', user: this.receiver, date: new Date('2024-04-17T09:00:00') },
    { content: 'Message 7', user: this.sender, date: new Date('2024-04-17T08:00:00') },
    { content: 'Message 12', user: this.receiver, date: new Date('2024-04-19T09:00:00') },
    { content: 'Message 10 long texte vriament il est trop tard pour reflechir à quoi écrire, je crois que je deviasi juste sauter pas la fenetre, zut elle est fermée, ouvrons là alors, les volets sont fermé, \n -bah ouvre-les, \n - on est au rez-de chausser \n - bah va dormir', user: this.sender, date: new Date('2024-04-18T09:00:00') },
    { content: 'Message 6', user: this.receiver, date: new Date('2024-04-16T10:00:00') },
    { content: 'Message 5', user: this.sender, date: new Date('2024-04-16T09:00:00') },
    { content: 'Message 11', user: this.sender, date: new Date('2024-04-19T08:00:00') },
    { content: 'Message 3', user: this.sender, date: new Date('2024-04-15T10:00:00') },
    { content: 'Message 2', user: this.receiver, date: new Date('2024-04-14T08:30:00') },
    { content: 'Message 9', user: this.sender, date: new Date('2024-04-18T08:00:00') },
    { content: 'Message 1', user: this.sender, date: new Date('2024-04-14T08:00:00') },
  ];

  @ViewChild('messageContainer', { static: false }) messageContainer: ElementRef | undefined;

  constructor() { }
  ngOnInit(): void {
  }
}
