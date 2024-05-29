import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import { ChatObject } from "./chatObject";
import { TranslatorService } from "../../base-shared/translator.service";
import {GlobalService} from "../../global.service";
import { UserRecap } from "../../../http/model/user-model/userObject";
import {MessageModelService} from "../../../http/model/message-model/message-model.service";
import {DateService} from "../../../http/shared/date.service";
import {MessageObject, MessagePostObject} from "../../../http/model/message-model/messageObject";
import moment from "moment";
import {MessageMapperService} from "../../../mapper/message-mapper.service";
import {HttpErrorResponse} from "@angular/common/http";

export type ChatTarget = {subject:'prestation'|'reservation'|'ticket', id:number|bigint}

@Component({
  selector: 'pm-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() set items(items:ChatObject[]){
    this.sortedMessages = items.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  };
  @Input() auto:boolean = true;
  @Input() target ?: ChatTarget;
  free:boolean = true;
  sending_message?:ChatObject;
  currentUser?:UserRecap = GlobalService.currentUser;
  sortedMessages: ChatObject[] = [];
  new_message:string = "";

  constructor(
    public translator: TranslatorService,
    private messageService : MessageModelService
  ) {}

  ngOnInit(): void {
    this.reload();
  }

  getInitials(userName: string): string {
    return userName.charAt(0).toUpperCase();
  }

  can_submit():boolean{
    return !!(this.currentUser?.id && this.target && this.free)
  }

  submit_message():void{
    if (this.currentUser?.id && this.target && this.free) {
      const message: MessagePostObject = {
        texte: this.new_message,
        id_UTILISATEUR: this.currentUser.id,
        date_envoie: DateService.to_api()
      }
      switch (this.target.subject) {
        case 'prestation':
          message.id_SERVICE_UTILISEE = this.target.id
          break
        case 'ticket':
          message.id_TICKET = this.target.id
          break
        case 'reservation':
          message.id_RESERVATION = this.target.id
          break
      }
      this.free = false;
      this.sending_message = {
          content: message.texte,
          date: moment().toDate(),
          user: this.currentUser?.nom?? ''
      }

      const error:EventEmitter<HttpErrorResponse> = new EventEmitter<HttpErrorResponse>();
        error.subscribe(()=>{
          this.free = true;
          this.sending_message = undefined;
        }
      )
      this.messageService.post_message(
        message,
        error
        ).subscribe(
        () => {
          this.new_message = '';
          this.free = true;
          this.reload()
        }
      );
    }
  }

  reload():void{
    if (this.auto && this.free && this.target){
      this.sending_message = undefined;

      switch (this.target.subject) {
        case 'prestation':
          this.messageService.get_messages_from_prestation(this.target.id).subscribe((messages)=>
            this.items = messages.map(
              (m)=>
                MessageMapperService.model_to_chat(m))
          );
          break
        case 'ticket':
          this.messageService.get_messages_from_ticket(this.target.id).subscribe((messages)=>
            this.items = messages.map(
              (m)=>
                MessageMapperService.model_to_chat(m))
          );
          break;
        case 'reservation':
          this.messageService.get_messages_from_reservation(this.target.id).subscribe((messages)=>
            this.items = messages.map(
              (m)=>
                MessageMapperService.model_to_chat(m))
          );
          break
      }
    }
  }
}
