import { Injectable } from '@angular/core';
import {ServiceObject} from "../http/model/service-model/serviceObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";

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
        null,
        null,
      ],
      mid:[
        {text : "description : "+ service?.description},
        null,
        null,
      ],
      propriete:[
        {name : 'note' , value: service?.note},
        {name : 'type', value: service?.type},
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
          {name : 'id', type:'text', text:service?.id.toString()},
          {name : 'type', type:'text', text:service?.type},
          {name : 'description', type:'text', text:service?.description},
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
        note:FormService.get_value(values, 'note', defalt?.note) as  number,
    }
  }
}
