import { Component, OnInit } from '@angular/core';
import {ChatObject} from "../../shared/foundation/chat/chatObject";

@Component({
  templateUrl: './gen-chat.component.html',
  styleUrls: ['./gen-chat.component.scss']
})
export class GenChatComponent implements OnInit {
  items:ChatObject[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
