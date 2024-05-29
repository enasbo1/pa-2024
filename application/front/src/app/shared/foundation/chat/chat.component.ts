import { Component, Input, OnInit } from '@angular/core';
import { ChatObject } from "./chatObject";
import { TranslatorService } from "../../base-shared/translator.service";
import {GlobalService} from "../../global.service";
import {UserObject, UserRecap} from "../../../http/model/user-model/userObject";

@Component({
  selector: 'pm-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() set items(items:ChatObject[]){
    this.sortedMessages = items.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
  };
  currentUser?:UserRecap = GlobalService.currentUser;
  sortedMessages: ChatObject[] = [];

  constructor(public translator: TranslatorService) {}

  ngOnInit(): void {
  }

  getInitials(userName: string): string {
    return userName.charAt(0).toUpperCase();
  }
}
