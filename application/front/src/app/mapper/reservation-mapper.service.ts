import { Injectable } from '@angular/core';
import {ListObject} from "../shared/foundation/list/listObject";
import {DateService} from "../http/shared/date.service";
import {ReservationObject, ReservationRentObject} from "../http/model/reservation-model/ReservationObject";
import {RubricObject} from "../shared/base-shared/rubric/rubricObject";
import {UserMapperService} from "./user-mapper.service";
import {WpPath} from "../shared/routes";
import {FormFieldObject} from "../shared/base-shared/form-field/formFieldObject";
import {FormService} from "../shared/foundation/form/form.service";
import {FormStepObject} from "../shared/base-shared/form-step/formStepObject";

@Injectable({
  providedIn: 'root'
})
export class ReservationMapperService {


  static model_to_list(reservation: ReservationObject, detailPage?: string): ListObject {
    return {
      title: `Reservation ${reservation.id}`,
      link: (detailPage?`${detailPage}/`:'') + reservation.id,
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
      title: (title ??'') + 'Reservation - ' + reservation?.id,
      content: [
        {name: 'id', type: 'text', text: reservation?.id?.toString()},
        {name: 'total_location', type: 'text', text: reservation?.total_location.toString()},
        {name: 'total_abonnement', type: 'text', text: reservation?.total_abonnement?.toString()},
        {name: 'date_debut', type: 'text', text: DateService.to_front(reservation?.date_debut)},
        {name: 'date_fin', type: 'text', text: DateService.to_front(reservation?.date_fin)},
        {name: 'validée', type: 'text', text: reservation?.valide?'Oui':'Non'},
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

  static model_to_form_step(reservation?: ReservationObject): FormStepObject {
    return {
      title: 'Modifier la réservation',
      content: [
        {
          title: 'Détails',
          content: [
            {
              name: 'total_location',
              type: 'num',
              title: 'Total Location : ' + reservation?.total_location,
              placeholder: reservation?.total_location,
              default: reservation?.total_location,
            },
            {
              name: 'total_abonnement',
              type: 'num',
              title: 'Total Abonnement : ' + reservation?.total_abonnement,
              placeholder: reservation?.total_abonnement,
              default: reservation?.total_abonnement,
            },
            {
              name: 'total_frais',
              type: 'num',
              title: 'Total Frais : ' + reservation?.total_frais,
              placeholder: reservation?.total_frais,
              default: reservation?.total_frais,
            },
          ],
        },
        {
          title: 'Dates',
          content: [
            {
              name: 'date',
              type: 'period',
              title: 'Période',
              placeholder: reservation?.date_debut + " - " + reservation?.date_fin,
            },
          ],
        }
      ],
    };
  }

  static form_to_model(values: FormFieldObject[], defalt?: ReservationRentObject): ReservationRentObject {
    let dates = FormService.get_period(values, "date");
    return {
      total_location: FormService.get_value(values, 'total_location', defalt?.total_location) as number,
      total_abonnement: FormService.get_value(values, 'total_abonnement', defalt?.total_abonnement) as number,
      total_frais: FormService.get_value(values, 'total_frais', defalt?.total_frais) as number,
      date_debut: (dates?.start as string)?? defalt?.date_debut,
      date_fin: (dates?.end as string)?? defalt?.date_fin,
      id_appartement : defalt?.id_appartement?? 0,
    };
  }
}
