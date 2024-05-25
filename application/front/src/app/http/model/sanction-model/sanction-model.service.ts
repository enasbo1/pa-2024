import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {SanctionObject} from "./sanctionObject";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SanctionModelService extends RequestService{

  post_sanction(sanction:SanctionObject, errorCatch?:EventEmitter<HttpErrorResponse>):Observable<object>{
    return this.post(sanction, 'banissement', errorCatch)
  }

  get_sanctions_by_user(id:number|bigint):Observable<SanctionObject[]>{
    return this.get('banissement/user/'+id) as Observable<SanctionObject[]>
  }
}
