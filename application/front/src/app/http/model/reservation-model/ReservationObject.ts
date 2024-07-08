import {UserRecap} from "../user-model/userObject";
import {ApartmentRecap} from "../apartment-model/ApartmentObject";

export interface ReservationPeriod {
  date_fin:string
  date_debut:string
}


export interface ReservationObject extends ReservationPeriod {
  id?:number
  total_location:number
  total_abonnement?:number
  total_frais?:number
  appartement:ApartmentRecap
  utilisateur:UserRecap
}
