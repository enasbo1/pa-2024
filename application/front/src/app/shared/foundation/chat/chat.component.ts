import { Component, Input, OnInit } from '@angular/core';
import { ChatObject } from "./chatObject";
import { TranslatorService } from "../../base-shared/translator.service";

@Component({
  selector: 'pm-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() items: ChatObject[] = [];
  sortedMessages: ChatObject[] = [];

  constructor(public translator: TranslatorService) {}

  ngOnInit(): void {
    this.sortMessages(); // Fonction de tri utilisée
  }

  sortMessages(): void {
    this.sortedMessages = this.items.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  getInitials(userName: string): string {
    return userName.charAt(0).toUpperCase();
  }
}
