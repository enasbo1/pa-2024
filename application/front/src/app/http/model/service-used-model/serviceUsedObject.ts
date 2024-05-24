import {ServiceObject} from "../service-model/serviceObject";
import {EnterpriseObject} from "../enterprise-model/enterpriseObject";

export interface ServiceUsedObject{
  id : number
  date_modif ?: string
  date_debut : string

  reservation : {
    id_reservation : number
    id_appartement : number
    ville:string
  }
  entreprise : EnterpriseObject

  utilisateur : {
    id:number
    nom:string
    prenom:string
    mail:string
  }
  service?:ServiceObject
}
