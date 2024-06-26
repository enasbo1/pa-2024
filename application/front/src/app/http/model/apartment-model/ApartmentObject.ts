import {UserRecap} from "../user-model/userObject";

export interface ApartmentRecap{
  id ?: number
  ville : string
  code_postal ?: number
  prix_fixe_nuit ?: number
  type_gestion ?: string
  duree ?: number
  type_de_bien ?: string
  logement_entier ?: number
  nb_chambre ?: number
  nb_occupant_max ?: number
  surface ?: number
  horaire_contact ?: number
  utilisateur ?: UserRecap
}


export interface ApartmentObject extends ApartmentRecap{
  id ?: number
  ville : string
  code_postal : number
  prix_fixe_nuit : number
  type_gestion : string
  duree : number
  type_de_bien : string
  logement_entier : number
  nb_chambre : number
  nb_occupant_max : number
  surface : number
  horaire_contact : number
  utilisateur : UserRecap
}
