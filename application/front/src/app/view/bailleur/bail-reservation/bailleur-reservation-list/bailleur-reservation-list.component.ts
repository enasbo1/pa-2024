import { Component, OnInit } from '@angular/core';
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {ReservationModelService} from "../../../../http/model/reservation-model/reservation-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {ReservationMapperService} from "../../../../mapper/reservation-mapper.service";

@Component({
  selector: 'pm-bailleur-reservation-list',
  templateUrl: './bailleur-reservation-list.component.html',
  styleUrls: ['./bailleur-reservation-list.component.scss']
})
export class BailleurReservationListComponent implements OnInit {
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

    this.reservationService.get_reservations_from_bailleur().subscribe((reservations) =>
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
