import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {MessageObject} from "./messageObject";
import {RequestService} from "../../shared/request.service";

@Injectable({
  providedIn: 'root'
})
export class MessageModelService extends RequestService{

  get_messages_from_prestation(prestation:number|bigint):Observable<MessageObject[]>{
    return this.get('message/service_used/'+prestation) as Observable<MessageObject[]>
  }
}
