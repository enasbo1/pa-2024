import { Component, OnInit } from '@angular/core';
import { FilterObject } from "../../../../shared/foundation/list/filterObject";
import { ListObject } from "../../../../shared/foundation/list/listObject";
import { ReservationService } from "../../../../http/shared/reservation-service.service";
import { ApartmentService } from "../../../../http/shared/apartment-service.service";

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
    private reservationService: ReservationService,
    private apartmentService: ApartmentService
  ) { }

  ngOnInit(): void {
    this.reservationService.get_reservations().subscribe((reservations) =>
      this.setReservations(
        reservations.map((reservation) =>
          this.reservationService.reservation_to_list(reservation, this.detailPage))
      )
    );
  }

  private setReservations(reservations: ListObject[]): void {
    this.reservations = reservations;
  }

  getApartmentName(id: number): string {
    // Assuming synchronous retrieval for simplicity; may need adjustment for async.
    let apartmentName = 'Unknown';
    this.apartmentService.findById(id).subscribe(apartment => {
      apartmentName = apartment.ville;
    });
    return apartmentName;
  }
}
