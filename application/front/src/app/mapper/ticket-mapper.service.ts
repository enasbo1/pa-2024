import { Injectable } from '@angular/core';
import {ListObject} from "../shared/foundation/list/listObject";
import {TicketObject} from "../http/model/ticket-model/ticketObject";
import {UserMapperService} from "./user-mapper.service";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";

@Injectable({
  providedIn: 'root'
})
export class TicketMapperService {
  static aim_target(ticket?:TicketObject){
    return ticket?.id_message?'message':ticket?.id_reservation?'reservation':ticket?.id_service?'service':'none'
  }

  static model_to_rubric(ticket?:TicketObject):RubricObject{
    return {
      title:'',
      content:[
        {name : 'sujet', type:'text' , text: ticket?.sujet},
        {name : 'reporter', type:'text'  , text: UserMapperService.get_U_Name(ticket?.utilisateur)},
        {name : 'description', type:'text'  , text: ticket?.description},
        {name : 'date_creation', type:'text' , text: ticket?.date_creation},
        {name : 'date_modif', type:'text' , text: ticket?.date_modif},
        {name : 'workflow', type:'text' , text: ticket?.id_traitant?'wip':'todo'},
        {name : 'target', type:'text' , text:TicketMapperService.aim_target(ticket) },
      ]
    }
  }

  static model_to_list(ticket?:TicketObject):ListObject{
    return {
      title:ticket?.sujet,
      link:ticket?.id?.toString(),
      style:ticket?.id_traitant?'present':'passe',
      right:[
        {text : "reporter : "+ UserMapperService.get_U_Name(ticket?.utilisateur)},
        {text : "description : "+ ticket?.description},
        null,
      ],
      propriete:[
        {name : 'sujet' , value: ticket?.sujet},
        {name : 'reporter' , value: UserMapperService.get_U_Name(ticket?.utilisateur)},
        {name : 'description' , value: ticket?.description},
        {name : 'date_creation', value: ticket?.date_creation},
        {name : 'date_modif', value: ticket?.date_modif},
        {name : 'workflow', value: ticket?.id_traitant?'wip':'todo'},
        {name : 'target', value: TicketMapperService.aim_target(ticket)},
        {name : 'number', value: ticket?.id},
      ]
    }
  }
}
