import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListObject } from "../../../shared/foundation/list/listObject";
import {RequestService} from "../../shared/request.service";
import {DateService} from "../../shared/date.service";

@Injectable({
  providedIn: 'root'
})
export class ReservationModelService extends RequestService{

  get_reservations(): Observable<any[]> {
    return this.get('reservation') as Observable<any[]>;
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
        { text: `Date fin: ${DateService.to_front(reservation.date_fin)}` },
        { text: `Appartement ID: ${reservation.id_appartement?? ''}` }
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
