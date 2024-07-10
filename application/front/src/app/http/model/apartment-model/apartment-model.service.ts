import {EventEmitter, Injectable} from '@angular/core';
import { HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {RequestService} from "../../shared/request.service";
import {ApartmentObject, ApartmentOccupedObject} from "./ApartmentObject";


@Injectable({
  providedIn: 'root'
})
export class ApartmentModelService extends RequestService{

  get_apartments(): Observable<ApartmentObject[]> {
    return this.get('apartment') as Observable<ApartmentObject[]>;
  }

  get_louables(): Observable<ApartmentOccupedObject[]> {
    return this.get('apartment/louable') as Observable<ApartmentOccupedObject[]>;
  }

  get_one_apartment(id:number|bigint): Observable<ApartmentObject[]>{
    return this.get_one('apartment', id) as Observable<ApartmentObject[]>;
  }

  delete_apartment(id: number|bigint, error: EventEmitter<HttpErrorResponse>): Observable<object>{
    return this.delete('apartment', id)
  }

  get_one_louable(id:number|bigint): Observable<ApartmentOccupedObject[]> {
    return this.get_one('apartment/louable', id) as Observable<ApartmentOccupedObject[]>;

  }
}
