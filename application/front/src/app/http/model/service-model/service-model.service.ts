import {Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import { Observable} from "rxjs";
import {ServiceObject} from "./serviceObject";
import {ListObject} from "../../../shared/foundation/list/listObject";

@Injectable({
  providedIn: 'root'
})
export class ServiceModelService extends RequestService{

  service_to_list(service:ServiceObject, detailPage:string):ListObject{
    return {
      title:service.type,
      link:detailPage+"/"+service.id,
      right:[
        {text : "note : "+ service.note},
        {text : "tarif : "+ service.tarif + '€'},
        null,
      ],
      mid:[
        {text : "description : "+ service.description},
        {text : "date debut : "+ service.date_debut + " date fin : "+ service.date_fin},
        null,
      ],
      propriete:[
        {name : 'note' , value: service.note},
        {name : 'date_debut' , value: service.date_debut},
        {name : 'date_fin' , value: service.date_fin},
        {name : 'type', value: service.type},
        {name : 'tarif', value: service.tarif},
        {name : 'description', value: service.description},
        {name : 'number', value: service.id},
      ]
    }
  }



  get_service():Observable<ServiceObject[]>{
    return (this.get('service') as Observable<ServiceObject[]>);
  }

  get_one_service(number:bigint):Observable<ServiceObject[]>{
    return (this.get_one('service',number) as Observable<ServiceObject[]>);

  }
}
