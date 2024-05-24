import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListObject } from "../../shared/foundation/list/listObject";


@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  private apiUrl = 'http://ton-domaine.com/api/apartments';  // URL de l'API PHP

  constructor(private http: HttpClient) { }

  get_apartments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  findById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
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
