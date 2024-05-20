import {ServiceObject} from "../service-model/serviceObject";

export interface ServiceUsedObject{
  id : number
  date_modif : string
  date_debut : string

  reservation : {
    id_reservation : number
    id_appartement : number
    ville:string
  }
  entreprise : {
    nom:string
    id:number
    logo?:string
  }

  utilisateur : {
    id:number
    nom:string
    prenom:string
    mail:string
  }
  service?:ServiceObject
}
