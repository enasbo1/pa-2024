import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ReservationModelService} from "../../../../http/model/reservation-model/reservation-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {ReservationMapperService} from "../../../../mapper/reservation-mapper.service";
import {WpPath} from "../../../../shared/routes";

@Component({
  selector: 'pm-voyageur-reservation',
  templateUrl: './voyageur-reservation.component.html',
  styleUrls: ['./voyageur-reservation.component.scss']
})
export class VoyageurReservationComponent implements OnInit {
  reservations: ListObject[] = [];
  filters: FilterObject[] = [
    { name: 'date_debut', type: 'auto' },
    { name: 'date_fin', type: 'auto' },
    { name: 'id_appartement', type: 'auto' },
    { name: 'total_location', type: 'auto' },
  ];
  critera: string[] = [
    'description',
    'number'
  ];
  constructor(
    private reservationService: ReservationModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Location";

    this.reservationService.get_reservations_from_voyageur().subscribe((reservations) =>
      this.setReservations(
        reservations.map((reservation) =>
          ReservationMapperService.model_to_list(reservation))
      )
    );
  }

  private setReservations(reservations: ListObject[]): void {
    this.reservations = reservations;
  }

}
