import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListObject } from "../../../shared/foundation/list/listObject";
import {RequestService} from "../../shared/request.service";
import {ApartmentObject} from "./ApartmentObject";


@Injectable({
  providedIn: 'root'
})
export class ApartmentModelService extends RequestService{

  get_apartments(): Observable<ApartmentObject[]> {
    return this.get('apartment') as Observable<ApartmentObject[]>;
  }

  get_one_apartment(id:number|bigint): Observable<ApartmentObject[]>{
    return this.get_one('apartment', id) as Observable<ApartmentObject[]>;
  }

  delete_apartment(id: number|bigint, error: EventEmitter<HttpErrorResponse>): Observable<object>{
    return this.delete('apartment', id)
  }
}
