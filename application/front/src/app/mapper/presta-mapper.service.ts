import { Injectable } from '@angular/core';
import {ServiceUsedObject} from "../http/model/service-used-model/serviceUsedObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {UserMapperService} from "./user-mapper.service";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {DateService} from "../http/shared/date.service";
import {WpPath} from "../shared/routes";
import {ServiceMapperService} from "./service-mapper.service";

@Injectable({
  providedIn: 'root'
})
export class PrestaMapperService {
  static model_to_rubric(serviceUsed?:ServiceUsedObject):RubricObject{
   return  {
       title : "service rendu : " + serviceUsed?.service?.type,
       content : [
          {name : 'id', type:'text', text: serviceUsed?.id.toString()},
          {name : 'modif', type:'text', text : DateService.to_front(serviceUsed?.date_modif)},
          {name : 'date', type:'text', text: DateService.to_front(serviceUsed?.date_debut)},
          {name : 'lieu', type:'text', text: serviceUsed?.reservation?.ville},

          {name : 'Reservation', type:'link',
            text:serviceUsed?.reservation?.id_reservation.toString(),
            value:'admin/reservation/'+serviceUsed?.id
          },

          {name : 'Entreprise', type:'link',
            text:serviceUsed?.entreprise?.nom,
            value:WpPath.admin.enterprise.root+'/'+serviceUsed?.entreprise.id
          },

          {name : 'Bénéficiaire', type:'link',
            text:UserMapperService.get_U_Name(serviceUsed?.utilisateur),
            value:WpPath.admin.users.root+'/'+serviceUsed?.utilisateur.id
          },
          {name : 'Service', type:'panel',
            text:serviceUsed?.service?.type.toString(),
            value:ServiceMapperService.model_to_rubric(serviceUsed?.service)
          }
        ]
      }
  }

  static model_to_list(serviceUsed:ServiceUsedObject, detailPage?:string):ListObject{
    const date_status:string = DateService.checkDateStatus(serviceUsed?.date_debut, serviceUsed?.date_fin)
    return {
      title:"Service Rendu",
      link:(detailPage?detailPage+"/":'')+serviceUsed.id,
      style: date_status.replace('é','e'),
      right:[
        {text : "prestataire : "+ serviceUsed.entreprise.nom},
        {text : "bénéficiaire : "+ UserMapperService.get_U_Name(serviceUsed.utilisateur)},
        {text : "lieu : "+ serviceUsed.reservation.ville},
      ],
      mid:[
        {text : "service : "+ serviceUsed.service?.type},
        {text : "id appartement : "+ serviceUsed.reservation.id_appartement},
        {text : "date debut : "+ DateService.to_front(serviceUsed?.date_debut) + " | date fin : "+ DateService.to_front(serviceUsed?.date_fin)},
      ],
      left:[
        null,
        {text: "tarif "+serviceUsed?.tarif},
        null,
      ],
      propriete:[
        {name : 'id' , value: serviceUsed.id},
        {name : 'etat_date',value: date_status},
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
        {name : 'tarif', value: serviceUsed?.tarif},
        {name : 'date_debut', value: serviceUsed.date_debut},
        {name : 'date_fin', value: serviceUsed.date_fin},
        {name : 'service.note', value: serviceUsed.service?.note},
        {name : 'fiche', value: serviceUsed.fiche},
        {name : 'coef', value: serviceUsed.coef},
      ]
    }
  }
}
