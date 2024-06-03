import { Injectable } from '@angular/core';
import {ListObject} from "../shared/foundation/list/listObject";
import {TicketObject} from "../http/model/ticket-model/ticketObject";
import {UserMapperService} from "./user-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class TicketMapperService {
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
        {name : 'workflow', value: ticket?.id_traitant?'en cours':'à traiter'},
        {name : 'target', value: ticket?.id_MESSAGE?'message':ticket?.id_RESERVATION?'reservation':ticket?.id_SERVICE?'service':'none'},
        {name : 'number', value: ticket?.id},
      ]
    }
  }
}
