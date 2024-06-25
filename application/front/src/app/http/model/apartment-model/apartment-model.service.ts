import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListObject } from "../../../shared/foundation/list/listObject";
import {RequestService} from "../../shared/request.service";
import {ApartmentObject} from "./ApartmentObject";


@Injectable({
  providedIn: 'root'
})
export class ApartmentModelService extends RequestService{

  get_apartments(): Observable<ApartmentObject[]> {
    return this.get('apartments') as Observable<ApartmentObject[]>;
  }

  apartment_to_list(apartment: any): ListObject {
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
}
