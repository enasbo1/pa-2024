import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  templateUrl: './gen-chat.component.html',
  styleUrls: ['./gen-chat.component.scss']
})
export class GenChatComponent implements OnInit {
  messages = [
    { content: 'Message 4', user: 'receiver', date: new Date('2024-04-15T11:00:00') },
    { content: 'Message 8', user: 'receiver', date: new Date('2024-04-17T09:00:00') },
    { content: 'Message 7', user: 'sender', date: new Date('2024-04-17T08:00:00') },
    { content: 'Message 12', user: 'receiver', date: new Date('2024-04-19T09:00:00') },
    { content: 'Message 10', user: 'receiver', date: new Date('2024-04-18T09:00:00') },
    { content: 'Message 6', user: 'receiver', date: new Date('2024-04-16T10:00:00') },
    { content: 'Message 5', user: 'sender', date: new Date('2024-04-16T09:00:00') },
    { content: 'Message 11', user: 'sender', date: new Date('2024-04-19T08:00:00') },
    { content: 'Message 3', user: 'sender', date: new Date('2024-04-15T10:00:00') },
    { content: 'Message 2', user: 'receiver', date: new Date('2024-04-14T08:30:00') },
    { content: 'Message 9', user: 'sender', date: new Date('2024-04-18T08:00:00') },
    { content: 'Message 1', user: 'sender', date: new Date('2024-04-14T08:00:00') },
  ];
  
  sortedMessages: any[] = []; // nouveau tableau qui contiendra les messages triés par date

  @ViewChild('messageContainer', { static: false }) messageContainer: ElementRef | undefined;

  constructor() { }
  ngOnInit(): void {
  }
}