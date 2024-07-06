import {EventEmitter, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { ListObject } from "../../../shared/foundation/list/listObject";
import {RequestService} from "../../shared/request.service";
import {DateService} from "../../shared/date.service";
import {ReservationObject} from "./ReservationObject";
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
}
