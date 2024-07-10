import { Component, OnInit } from '@angular/core';
import { FilterObject } from "../../../../shared/foundation/list/filterObject";
import { ListObject } from "../../../../shared/foundation/list/listObject";
import { ReservationModelService } from "../../../../http/model/reservation-model/reservation-model.service";
import {ApartmentModelService} from "../../../../http/model/apartment-model/apartment-model.service";
import {GlobalService} from "../../../../shared/global.service";
import {ReservationMapperService} from "../../../../mapper/reservation-mapper.service";

@Component({
  selector: 'pm-gestion-location',
  templateUrl: './gestion-location.component.html',
  styleUrls: ['./gestion-location.component.scss']
})
export class GestionLocationComponent implements OnInit {
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

  private detailPage: string = "/admin/location";

  constructor(
    private reservationService: ReservationModelService,
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Location";

    this.reservationService.get_reservations().subscribe((reservations) =>
      this.setReservations(
        reservations.map((reservation) =>
          ReservationMapperService.model_to_list(reservation, this.detailPage))
      )
    );
  }

  private setReservations(reservations: ListObject[]): void {
    this.reservations = reservations;
  }
}
