import { Injectable } from '@angular/core';
import {ServiceObject} from "../http/model/service-model/serviceObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {DateService} from "../http/shared/date.service";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class ServiceMapperService {
  static model_to_list(service?:ServiceObject):ListObject{
    const date_status:string = DateService.checkDateStatus(service?.date_debut, service?.date_fin)
    return {
      title:service?.type,
      link:service?.id.toString(),
      style: date_status.replace('é','e'),
      right:[
        {text : "note : "+ service?.note},
        {text : "tarif : "+ service?.tarif + '€'},
        null,
      ],
      mid:[
        {text : "description : "+ service?.description},
        {text : "date debut : "+ DateService.to_front(service?.date_debut) + " | date fin : "+ DateService.to_front(service?.date_fin)},
        null,
      ],
      propriete:[
        {name : 'note' , value: service?.note},
        {name : 'etat_date',value:
            date_status
        },
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
          {name : 'etat_date', type: 'text', text:
              DateService.checkDateStatus(
                service?.date_debut,
                service?.date_fin)
          },
          {name : 'date_debut', type:'text', text:DateService.to_front(service?.date_debut)},
          {name : 'date_fin', type:'text', text:DateService.to_front(service?.date_fin)},
          {name : 'fiche', type:'text', text:service?.fiche},
          {name : 'coef', type:'text', text:service?.coef.toString()},
        ],
      }
    }
  }

  static model_to_form_step(service?:ServiceObject):FormStepObject{
    return {
        title:'modifier le service',
          content:[
        {
          title : 'details',
          content:[
            {
              name:'type',
              type:'text',
              title:'type : ' + service?.type,
              placeholder:service?.type,
              default:service?.type,
            },
            {
              name:'description',
              type:'longtext',
              title:'description',
              placeholder:service?.description,
              default:service?.description,
            },
          ]
        },
        {
          title:'dates',
          content:[
            {
              name :'date',
              type :'period',
            },
          ]
        },
        {
          title:'divers',
          content:[
            {
              title: 'note : '+ service?.note,
              name :'note',
              type :'num',
              step:0.1,
              number_limit:{
                max:5,
                min:0
              },
              default: service?.note,
              placeholder: service?.note
            },
            {
              title: 'coef : '+ service?.coef,
              name :'coef',
              type :'num',
              step:0.1,
              number_limit:{
                min:0.01
              },
              default: service?.coef,
              placeholder: service?.coef
            },
            {
              title: 'fiche : '+ service?.fiche,
              name :'fiche',
              type :'file',
              default: service?.fiche,
              placeholder: service?.fiche
            },
          ]
        }
      ]
    }
  }

  static form_to_model(values:FormFieldObject[], defalt?:ServiceObject):ServiceObject{
    let dates = FormService.get_period(values,"date")
    return {
        id:defalt?.id as number,
        type:FormService.get_value(values, 'type', defalt?.type) as string,
        description:FormService.get_value(values, 'description', defalt?.description) as string,
        tarif:FormService.get_value(values, 'tarif', defalt?.tarif) as number,
        date_debut:dates.start,
        date_fin:dates.end,
        note:FormService.get_value(values, 'note', defalt?.note) as  number,
        fiche:FormService.get_value(values, 'fiche', defalt?.fiche) as string,
        coef:FormService.get_value(values, 'coef', defalt?.coef) as number
    }
  }
}
