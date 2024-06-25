import {EventEmitter, Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {ServiceUsedObject} from "./serviceUsedObject";
import {RequestService} from "../../shared/request.service";
import {ServiceObject} from "../service-model/serviceObject";
import {ServiceUsedFromBailleur} from "./ServiceUsedFromBailleur";

@Injectable({
  providedIn: 'root'
})
export class ServiceUsedModelService extends RequestService{

  delete_usedService(number: bigint, errorCatch?:EventEmitter<HttpErrorResponse>): Observable<object> {
    return this.delete('service_used', number, errorCatch);
  }

  edit_usedService(service:ServiceUsedObject, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.edit(service,'service_used', errorCatch);
  }

  get_serviceUsed():Observable<ServiceUsedObject[]>{
    return (this.get('service_used') as Observable<ServiceUsedObject[]>);
  }

  get_used_from_service(number:bigint):Observable<ServiceUsedObject[]>{
    return (this.get('service_used/service/'+number) as Observable<ServiceUsedObject[]>)
  }

  get_one_serviceUsed(number:bigint):Observable<ServiceUsedObject[]>{
    return (this.get_one('service_used',number) as Observable<ServiceUsedObject[]>);
  }

  get_service_from_user():Observable<ServiceUsedObject[]>{
    return this.get('service_used/currentUser') as Observable<ServiceUsedObject[]>;
  }

  get_from_bailleur():Observable<ServiceUsedFromBailleur[]>{
    return this.get('service_used/bailleur') as Observable<ServiceUsedFromBailleur[]>;
  }
}
