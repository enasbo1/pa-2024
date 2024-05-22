import { Injectable } from '@angular/core';
import {UserObject} from "../http/model/user-model/userObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {UserModelService} from "../http/model/user-model/user-model.service";

@Injectable({
  providedIn: 'root'
})
export class UserMapperService {
  static get_U_Name(user?: { prenom?:string, nom?:string }):string{
    let i:string|undefined = user?.prenom;
    i = i?i[0].toUpperCase():'';
    return i+". " +user?.nom
  }

  static model_to_list(user?:UserObject, detailPage?:string):ListObject{
    return {
      title:UserMapperService.get_U_Name(user),
      link:(detailPage?detailPage+"/":'')+user?.id,
      right:[
        {text : "Mail : "+ user?.mail},
        {text : "Nom : "+ user?.nom },
        {text : "Prenom : "+ user?.prenom }
      ],
      mid:[
        {text : "Adresse : "+ user?.adresse},
        {text : "Ville : "+ user?.ville},
        {text : "Pays : "+ user?.pays}

      ],
      propriete:[
        {name : 'Role' , value: user?.role},
        {name : 'Pays' , value: user?.pays},
        /*

        besoin de rentrer tous les attributs de userObject?

        */
        {name : 'number', value: user?.id},
      ]
    }
  }

  static model_to_rubric(user?:UserObject, title?:string):RubricObject{
    return {
      title: (title?title:'') + UserMapperService.get_U_Name(user),
      content :[
        {name : 'id', type:'text', text:user?.id.toString()},
        {name : 'prenom', type:'text', text:user?.prenom},
        {name : 'nom', type:'text', text:user?.nom},
        {name : 'mail', type:'text', text:user?.mail},
        {name : 'adresse', type:'text', text:user?.adresse},
        {name : 'pays', type:'text', text:user?.pays},
        {name : 'ville', type:'text', text:user?.ville},
        {name : 'code_postal', type:'text', text:user?.code_postal?.toString()},
        {name : 'numero', type:'text', text:user?.numero?.toString()},
        {name : 'role', type:'text', text:user?.role},
        {name : 'entreprise', type:'link', text:user?.id_entreprise?.toString(),
          value:'entreprise/'+user?.id_entreprise},
      ]
    }
  }
}
