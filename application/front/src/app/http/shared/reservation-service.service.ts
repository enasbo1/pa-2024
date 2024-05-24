import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListObject } from "../../shared/foundation/list/listObject";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://ton-domaine.com/api/reservations';  // URL de l'API PHP

  constructor(private http: HttpClient) { }

  get_reservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  reservation_to_list(reservation: any, detailPage: string): ListObject {
    return {
      title: `Reservation ${reservation.id}`,
      link: `${detailPage}/${reservation.id}`,
      right: [
        { text: `Total: ${reservation.total_location}€` },
        null,
        null
      ],
      mid: [
        { text: `Date début: ${reservation.date_debut}` },
        { text: `Date fin: ${reservation.date_fin}` },
        { text: `Appartement ID: ${reservation.id_appartement}` }
      ],
      left: [
        null,
        null,
        null
      ],
      propriete: [
        { name: 'date_debut', value: reservation.date_debut },
        { name: 'date_fin', value: reservation.date_fin },
        { name: 'id_appartement', value: reservation.id_appartement },
        { name: 'total_location', value: reservation.total_location },
        { name: 'description', value: reservation.description },
        { name: 'number', value: reservation.id },
      ]
    };
  }
}
