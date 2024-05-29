export interface MessageObject{
  id?:number,
  date_envoie:string,
  texte:string,
  id_service_utilisee:number,
  id_reservation:number,
  id_tiket:number,
  utilisateur:{
    id:number,
    nom:string,
    prenom:string,
  }
}
