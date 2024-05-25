import {UserObject} from "../user-model/userObject";

export interface SanctionObject{
  id?:number
  sujet:string
  description:string
  date_debut:string
  date_fin:string
  specification:string
  id_utilisateur:number
}

export interface SanctionSpec{
  raison : 'message'|'reservation'|'prestatation'|'location'
  id_raison : number //une pseudo-clef étrangère
  type : 'vulgarité'|'violence'|string // doit pouvoir choisir entre ce qui a déjà été reseigné et en ajouter un nouveau
  restriction : 0|1|2|3|4 // chacun des status
  domaine:'role'|'rang' //concerne le rang en tant que prestataire ou le role sur l'application
}


