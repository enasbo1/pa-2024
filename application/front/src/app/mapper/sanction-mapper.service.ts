import {EventEmitter, Injectable} from '@angular/core';
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {SanctionObject} from "../http/model/sanction-model/sanctionObject";
import {DateService} from "../http/shared/date.service";
import {UserObject} from "../http/model/user-model/userObject";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";

@Injectable({
  providedIn: 'root'
})
export class SanctionMapperService {
  static model_to_rubric(sanction?: SanctionObject, title?: string, user?:string): RubricObject {
    return {
      title: (title?title:''),
      content :[
        {name : 'id', type:'text', text:sanction?.id?.toString()},
        {name : 'sujet', type:'text', text:sanction?.sujet},
        {name : 'description', type:'text', text:sanction?.description},
        {name : 'date_debut', type:'text', text:DateService.to_front(sanction?.date_debut)},
        {name : 'date_fin', type:'text', text:DateService.to_front(sanction?.date_fin)},
        {name : 'specification', type:'text', text:sanction?.specification},
        {name : 'utilisateur', type:'text', text: user?? sanction?.id_utilisateur.toString()},
      ]
    }
  }

  static model_to_form(sanction?:SanctionObject, title?:string):FormStepObject[]{
    const errorEvent: EventEmitter<string> = new EventEmitter<string>();
    return [
      {
        title: "type de sanction",
        errorEvent:errorEvent,
        content:[
          {
            title:'specifiacation',
            content:[

            ]
          }
        ]
      }
    ]

  }
}
