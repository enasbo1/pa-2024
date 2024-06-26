import {UserRecap} from "../user-model/userObject";

export interface TicketObject{
  id?:number
  sujet:string
  description:string
  date_creation:string
  date_modif:string
  id_traitant?:number
  id_reservation?:number
  id_service?:number
  id_message?:number
  utilisateur:UserRecap
}
