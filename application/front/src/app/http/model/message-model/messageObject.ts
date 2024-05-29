import {UserRecap} from "../user-model/userObject";

export interface MessageObject{
  id?:number,
  date_envoie:string,
  texte:string,
  id_SERVICE_UTILISEE?:number|bigint,
  id_RESERVATION?:number|bigint,
  id_TICKET?:number|bigint,
  utilisateur:UserRecap
}

export interface MessagePostObject{
  id?:number,
  date_envoie:string,
  texte:string,
  id_SERVICE_UTILISEE?:number|bigint,
  id_RESERVATION?:number|bigint,
  id_TICKET?:number|bigint,
  id_UTILISATEUR:number|bigint
}
