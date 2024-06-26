import {UserRecap} from "../user-model/userObject";
import {ApartmentRecap} from "../apartment-model/ApartmentObject";

export interface ReservationObject{
  id?:number
  total_location:number
  total_abonnement?:number
  date_fin:string
  date_debut:string
  total_frais?:number
  appartement:ApartmentRecap
  utilisateur:UserRecap
}
