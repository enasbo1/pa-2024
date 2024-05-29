import { Injectable } from '@angular/core';
import {MessageObject} from "../http/model/message-model/messageObject";
import {ChatObject} from "../shared/foundation/chat/chatObject";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class MessageMapperService {
  static model_to_chat(message:MessageObject):ChatObject{
    return {
      content:message.texte,
      date: moment(message.date_envoie).toDate(),
      user: message.utilisateur.nom
    }
  }
}
