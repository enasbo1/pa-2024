import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  templateUrl: './gen-chat.component.html',
  styleUrls: ['./gen-chat.component.scss']
})
export class GenChatComponent implements OnInit {
  messages = [
    { content: 'Message 1', user: 'sender' },
    { content: 'Message 2', user: 'receiver' },
    { content: 'Message 3', user: 'sender' },
    { content: 'Message 4', user: 'receiver' },
    { content: 'Message 5', user: 'sender' },
    { content: 'Message 6', user: 'receiver' },
    { content: 'Message 7', user: 'sender' },
    { content: 'Message 8', user: 'receiver' },
    { content: 'Message 9', user: 'sender' },
    { content: 'Message 10', user: 'receiver' },
    { content: 'Message 11', user: 'sender' },
    { content: 'Message 12', user: 'receiver' },
  ];

  @ViewChild('messageContainer', { static: false }) messageContainer: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.messageContainer) {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }
    } catch(err) { }
  }
}
