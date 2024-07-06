import { Injectable } from '@angular/core';
import {ListObject} from "../shared/foundation/list/listObject";
import {DateService} from "../http/shared/date.service";
import {ReservationObject} from "../http/model/reservation-model/ReservationObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {UserMapperService} from "./user-mapper.service";
import {WpPath} from "../shared/routes";

@Injectable({
  providedIn: 'root'
})
export class ReservationMapperService {


  static model_to_list(reservation: ReservationObject, detailPage: string): ListObject {
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
        { text: `Appartement ID: ${reservation.appartement?.id?? ''}` }
      ],
      left: [
        null,
        null,
        null
      ],
      propriete: [
        { name: 'date_debut', value: reservation.date_debut },
        { name: 'date_fin', value: reservation.date_fin },
        { name: 'id_appartement', value: reservation.appartement?.id },
        { name: 'total_location', value: reservation.total_location },
        { name: 'number', value: reservation.id },
      ]
    };
  }

  static model_to_rubric(
    reservation?:ReservationObject, title?:string,
    apartment_path:string = WpPath.admin.apartment.detail,
    user_path:string = WpPath.admin.users.detail
  ):RubricObject {
    return {
      title: (title ??'') + 'Reservation ',
      content: [
        {name: 'id', type: 'text', text: reservation?.id?.toString()},
        {name: 'total_location', type: 'text', text: reservation?.total_location.toString()},
        {name: 'total_abonnement', type: 'text', text: reservation?.total_abonnement?.toString()},
        {name: 'date_debut', type: 'text', text: reservation?.date_debut},
        {name: 'date_fin', type: 'text', text: reservation?.date_fin},
        {name: 'total_frais', type: 'text', text: reservation?.total_frais?.toString()},
        {name: 'appartement', type: 'link', text: reservation?.appartement?.id?.toString(),
          value:apartment_path.replace(':id', reservation?.appartement?.id?.toString()?? '')
        },
        {name: 'prorietaire', type: 'link', text: UserMapperService.get_U_Name(reservation?.appartement?.utilisateur),
          value: user_path.replace(':id', reservation?.appartement?.utilisateur?.id?.toString()?? '')
        },
        {name: 'service_used', type: 'link', text: "", value: '/admin/service_rendu?fromLocation='+reservation?.id},
      ]
    };
  }
}
