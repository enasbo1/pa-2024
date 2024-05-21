import {Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import { Observable} from "rxjs";
import {UserObject} from "./userObject";
import {ListObject} from "../../../shared/foundation/list/listObject";

@Injectable({
  providedIn: 'root'
})
export class UserModelService extends RequestService{
  public static get_U_Name(user:UserObject):string{
    let i:string = user.prenom;
    i = i?i[0].toUpperCase():'';
    return i+". " +user.nom
  }

  user_to_list(user:UserObject, detailPage:string):ListObject{
    return {
      title:UserModelService.get_U_Name(user),
      link:detailPage+"/"+user.id,
      right:[
        {text : "Mail : "+ user.mail},
        {text : "Nom : "+ user.nom },
        {text : "Prenom : "+ user.prenom }
      ],
      mid:[
        {text : "Adresse : "+ user.adresse},
        {text : "Ville : "+ user.ville},
        {text : "Pays : "+ user.pays}

      ],
      propriete:[
        {name : 'Role' , value: user.role},
        {name : 'Pays' , value: user.pays},
        /*

        besoin de rentrer tous les attributs de userObject?

        */
        {name : 'number', value: user.id},
      ]
    }
  }



  get_user():Observable<UserObject[]>{
    return (this.get('users') as Observable<UserObject[]>);
  }

  get_one_user(number:bigint):Observable<UserObject[]>{
    return (this.get_one('users',number) as Observable<UserObject[]>);

  }
}
