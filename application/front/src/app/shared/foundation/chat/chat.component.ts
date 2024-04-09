import {Component, Input, OnInit} from '@angular/core';
import {ChatObject} from "./chatObject";
import {TranslatorService} from "../../base-shared/translator.service";

@Component({
  selector: 'pm-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() items:ChatObject[] = [];
  constructor(public translator:TranslatorService) { }

  ngOnInit(): void {
  }

}
