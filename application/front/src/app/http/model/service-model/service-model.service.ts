import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import { Observable} from "rxjs";
import {ServiceObject} from "./serviceObject";
import {ListObject} from "../../../shared/foundation/list/listObject";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceModelService extends RequestService{

  delete_service(number: bigint, errorCatch?:EventEmitter<HttpErrorResponse>): Observable<object> {
    return this.delete('service', number, errorCatch);
  }

  edit_service(service:ServiceObject, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.edit(service,'service', errorCatch);
  }

  get_service():Observable<ServiceObject[]>{
    return (this.get('service') as Observable<ServiceObject[]>);
  }

  get_one_service(number:bigint):Observable<ServiceObject[]>{
    return (this.get_one('service',number) as Observable<ServiceObject[]>);
  }


}
