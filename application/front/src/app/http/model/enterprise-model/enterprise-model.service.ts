import { Injectable } from '@angular/core';
import {ListObject} from "../../../shared/foundation/list/listObject";
import {Observable} from "rxjs";
import {EnterpriseObject} from "./enterpriseObject";
import {RequestService} from "../../shared/request.service";

@Injectable({
  providedIn: 'root'
})
export class EnterpriseModelService extends RequestService{

  enterprise_to_list(enterprise:EnterpriseObject, detailPage:string):ListObject{
    return {
      title:enterprise.nom,
      link:detailPage+"/"+enterprise.id,
      image:enterprise.logo,
      right:[
        {text : this.translator.echo(enterprise.description)},
        null,
        null,
      ],
      propriete:[
        {name : 'description' , value: enterprise.description},
        {name : 'nom' , value: enterprise.nom},
        {name : 'number', value: enterprise.id},
      ]
    }
  }



  get_enterprise():Observable<EnterpriseObject[]>{
    return (this.get('entreprise') as Observable<EnterpriseObject[]>);
  }

  get_one_enterprise(number:bigint):Observable<EnterpriseObject[]>{
    return (this.get_one('entreprise',number) as Observable<EnterpriseObject[]>);
  }

  get_enterprise_from_service_id(number:bigint):Observable<EnterpriseObject[]>{
    return (this.get('service_entreprise/service/'+number) as Observable<EnterpriseObject[]>);

  }
}
