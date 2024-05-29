import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ChatObject} from "../../shared/foundation/chat/chatObject";

@Component({
  templateUrl: './gen-chat.component.html',
  styleUrls: ['./gen-chat.component.scss']
})
export class GenChatComponent implements OnInit {
  messages:ChatObject[] = [
    { content: 'Message 4', user: 'receiver', date: new Date('2024-04-15T11:00:00') },
    { content: 'Message 8', user: 'receiver', date: new Date('2024-04-17T09:00:00') },
    { content: 'Message 7', user: 'sender', date: new Date('2024-04-17T08:00:00') },
    { content: 'Message 12', user: 'receiver', date: new Date('2024-04-19T09:00:00') },
    { content: 'Message 10 long texte vriament il est trop tard pour reflechir à quoi écrire, je crois que je deviasi juste sauter pas la fenetre, zut elle est fermée, ouvrons là alors, les volets sont fermé, \n -bah ouvre-les, \n - on est au rez-de chausser \n - bah va dormir', user: 'receiver', date: new Date('2024-04-18T09:00:00') },
    { content: 'Message 6', user: 'receiver', date: new Date('2024-04-16T10:00:00') },
    { content: 'Message 5', user: 'sender', date: new Date('2024-04-16T09:00:00') },
    { content: 'Message 11', user: 'sender', date: new Date('2024-04-19T08:00:00') },
    { content: 'Message 3', user: 'sender', date: new Date('2024-04-15T10:00:00') },
    { content: 'Message 2', user: 'receiver', date: new Date('2024-04-14T08:30:00') },
    { content: 'Message 9', user: 'sender', date: new Date('2024-04-18T08:00:00') },
    { content: 'Message 1', user: 'sender', date: new Date('2024-04-14T08:00:00') },
  ];

  @ViewChild('messageContainer', { static: false }) messageContainer: ElementRef | undefined;

  constructor() { }
  ngOnInit(): void {
  }
}
