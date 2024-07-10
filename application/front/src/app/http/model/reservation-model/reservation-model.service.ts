import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {RequestService} from "../../shared/request.service";
import {ReservationObject, ReservationRentObject} from "./ReservationObject";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReservationModelService extends RequestService{

  get_reservations(): Observable<ReservationObject[]> {
    return this.get('reservation') as Observable<ReservationObject[]>;
  }

  get_one_reservation(id:number|bigint): Observable<ReservationObject[]>{
    return this.get_one('reservation', id) as Observable<ReservationObject[]>;
  }

  delete_reservation(id:number|bigint, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<any>{
    return this.delete('reservation', id, errorCatch);
  }

  get_reservations_from_voyageur(): Observable<ReservationObject[]> {
    return this.get('reservation/voy') as Observable<ReservationObject[]>;
  }

  get_one_reservation_from_voy(id: number|bigint) : Observable<ReservationObject[]> {
    return this.get_one('reservation/voy', id) as Observable<ReservationObject[]>;
  }

  post_rent(reservation:ReservationRentObject):Observable<any>{
    return this.post(reservation, 'reservation/rent')
  }
}
