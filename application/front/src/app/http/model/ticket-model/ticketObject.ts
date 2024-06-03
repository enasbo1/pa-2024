import {UserRecap} from "../user-model/userObject";

export interface TicketObject{
  id?:number
  sujet:string
  description:string
  date_creation:string
  date_modif:string
  id_traitant?:number
  id_RESERVATION?:number
  id_SERVICE?:number
  id_MESSAGE?:number
  utilisateur:UserRecap
}
