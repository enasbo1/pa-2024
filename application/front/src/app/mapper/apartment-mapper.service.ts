import { Injectable } from '@angular/core';
import {ServiceUsedObject} from "../http/model/service-used-model/serviceUsedObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {ApartmentObject, ApartmentRecap} from "../http/model/apartment-model/ApartmentObject";
import {ListObject} from "../shared/foundation/list/listObject";
import {UserMapperService} from "./user-mapper.service";
import {WpPath} from "../shared/routes";

@Injectable({
  providedIn: 'root'
})
export class ApartmentMapperService {
  apartment_to_list(apartment: ApartmentObject): ListObject {
    return {
      title: apartment.ville,
      link: `/admin/apartments/${apartment.id}`,
      right: [
        null,
        null,
        null
      ],
      mid: [
        { text: `Code Postal: ${apartment.code_postal}` },
        { text: `Type: ${apartment.type_de_bien}` },
        null,
      ],
      left: [
        null,
        null,
        null
      ],
      propriete: [
        { name: 'ville', value: apartment.ville },
        { name: 'code_postal', value: apartment.code_postal },
        { name: 'type_de_bien', value: apartment.type_de_bien },
        { name: 'prix_fixe_nuit', value: apartment.prix_fixe_nuit },
        { name: 'id', value: apartment.id },
      ]
    };
  }

  static model_to_rubric(apartment?: ApartmentRecap, title?:string, user_link:string =  WpPath.admin.users.detail): RubricObject {
    return {
      title : title ?? "Appartement - " + apartment?.id,
      content:[
        {name : 'numero', type:'text', text: apartment?.id?.toString()},
        {name : 'proprietaire', type:'link', text: UserMapperService.get_U_Name(apartment?.utilisateur),
          value : user_link.replace(':id', apartment?.utilisateur?.id?.toString()?? '')},
        {name : 'ville', type:'text', text: apartment?.ville},
        {name : 'code postal', type:'text', text: apartment?.code_postal?.toString()},
        {name : 'prix fixe nuit', type:'text', text: apartment?.prix_fixe_nuit?.toString()},
        {name : 'type gestion', type:'text', text: apartment?.type_gestion},
        {name : 'duree', type:'text', text: apartment?.duree?.toString()},
        {name : 'type de bien', type:'text', text: apartment?.type_de_bien},
        {name : 'logement entier', type:'text', text: apartment?.logement_entier?.toString()},
        {name : 'nb_chambre', type:'text', text: apartment?.nb_chambre?.toString()},
        {name : 'nb_occupant_max', type:'text', text: apartment?.nb_occupant_max?.toString()},
        {name : 'surface', type:'text', text: apartment?.surface?.toString()},
        {name : 'horaire_contact', type:'text', text: apartment?.horaire_contact?.toString()},
      ]
    }
  }
}
