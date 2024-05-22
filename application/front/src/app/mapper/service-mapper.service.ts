import { Injectable } from '@angular/core';
import {ServiceObject} from "../http/model/service-model/serviceObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {DateService} from "../http/shared/date.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceMapperService {
  static model_to_list(service?:ServiceObject):ListObject{
    return {
      title:service?.type,
      link:service?.id.toString(),
      right:[
        {text : "note : "+ service?.note},
        {text : "tarif : "+ service?.tarif + '€'},
        null,
      ],
      mid:[
        {text : "description : "+ service?.description},
        {text : "date debut : "+ service?.date_debut + " date fin : "+ service?.date_fin},
        null,
      ],
      propriete:[
        {name : 'note' , value: service?.note},
        {name : 'date_debut' , value: service?.date_debut},
        {name : 'date_fin' , value: service?.date_fin},
        {name : 'type', value: service?.type},
        {name : 'fiche', value: service?.fiche},
        {name : 'tarif', value: service?.tarif},
        {name : 'description', value: service?.description},
        {name : 'number', value: service?.id},
      ]
    }
  }

  static model_to_rubric(service?:ServiceObject):RubricObject{
    {
      return {
        title : 'service : ' + service?.type,
        content : [
          {name : 'note', type:'stars', text:"", value:service?.note},
          {name : 'tarif', type:'text', text:service?.tarif+'€'},
          {name : 'id', type:'text', text:service?.id.toString()},
          {name : 'type', type:'text', text:service?.type},
          {name : 'description', type:'text', text:service?.description},
          {name : 'date_debut', type:'text', text:DateService.to_front(service?.date_debut)},
          {name : 'date_fin', type:'text', text:DateService.to_front(service?.date_fin)},
          {name : 'fiche', type:'text', text:service?.fiche},
          {name : 'coef', type:'text', text:service?.coef.toString()},
        ],
      }
    }
  }
}
