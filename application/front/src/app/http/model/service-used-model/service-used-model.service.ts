import {EventEmitter, Injectable} from '@angular/core';
import {ServiceObject} from "../service-model/serviceObject";
import {ListObject} from "../../../shared/foundation/list/listObject";
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceUsedObject} from "./serviceUsedObject";
import {RequestService} from "../../shared/request.service";
import {EnterpriseObject} from "../enterprise-model/enterpriseObject";

@Injectable({
  providedIn: 'root'
})
export class ServiceUsedModelService extends RequestService{

  serviceUsed_to_list(serviceUsed:ServiceUsedObject, detailPage:string):ListObject{
    let i:string = serviceUsed.utilisateur.prenom
    i = i?i[0].toUpperCase():''
    return {
      title:"Service Rendu",
      link:detailPage+"/"+serviceUsed.id,
      right:[
        {text : "prestataire : "+ serviceUsed.entreprise.nom},
        {text : "bénéficiaire : "+i + '. '+ serviceUsed.utilisateur.nom},
        {text : "lieu : "+ serviceUsed.reservation.ville},
      ],
      mid:[
        {text : "service : "+ serviceUsed.service?.type},
        {text : "id appartement : "+ serviceUsed.reservation.id_appartement},
        {text : "date debut : "+ serviceUsed.date_debut},
      ],
      propriete:[
        {name : 'id' , value: serviceUsed.id},
        {name : 'date_modif' , value: serviceUsed.date_debut},
        {name : 'date_debut' , value: serviceUsed.date_debut},
        {name : 'appartement', value: serviceUsed.reservation.id_appartement},
        {name : 'ville', value: serviceUsed.reservation.ville},
        {name : 'entreprise.nom', value: serviceUsed.entreprise.nom},
        {name : 'entreprise.id', value: serviceUsed.entreprise.id},
        {name : 'entreprise.logo', value: serviceUsed.entreprise.logo},
        {name : 'utilisateur.id', value: serviceUsed.utilisateur.id},
        {name : 'utilisateur.nom', value: serviceUsed.utilisateur.nom},
        {name : 'utilisateur.prenom', value: serviceUsed.utilisateur.prenom},
        {name : 'utilisateur.mail', value: serviceUsed.utilisateur.mail},
        {name : 'utilisateur', value: serviceUsed.utilisateur.nom + " " + serviceUsed.utilisateur.prenom},
        {name : 'service.id', value: serviceUsed.service?.id},
        {name : 'service', value: serviceUsed.service?.type},
        {name : 'service.description', value: serviceUsed.service?.description},
        {name : 'service.tarif', value: serviceUsed.service?.tarif},
        {name : 'service.date_debut', value: serviceUsed.service?.date_debut},
        {name : 'service.date_fin', value: serviceUsed.service?.date_fin},
        {name : 'service.note', value: serviceUsed.service?.note},
        {name : 'service.fiche', value: serviceUsed.service?.fiche},
        {name : 'service.coef', value: serviceUsed.service?.coef},
      ]
    }
  }

  delete_usedService(number: bigint, errorCatch?:EventEmitter<HttpErrorResponse>): Observable<object> {
    return this.delete('service_used', number, errorCatch);
  }

  edit_usedService(service:ServiceUsedObject, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.edit(service,'service_used', errorCatch);
  }

  get_serviceUsed():Observable<ServiceUsedObject[]>{
    return (this.get('service_used') as Observable<ServiceUsedObject[]>);
  }

  get_used_from_service(number:bigint):Observable<ServiceUsedObject[]>{
    return (this.get('service_used/service/'+number) as Observable<ServiceUsedObject[]>)
  }

  get_one_serviceUsed(number:bigint):Observable<ServiceUsedObject[]>{
    return (this.get_one('service_used',number) as Observable<ServiceUsedObject[]>);
  }
}
