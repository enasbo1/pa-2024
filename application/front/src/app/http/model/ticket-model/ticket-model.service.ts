import {EventEmitter, Injectable} from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {Observable} from "rxjs";
import {TicketObject} from "./ticketObject";
import {HttpErrorResponse} from "@angular/common/http";
import * as url from "node:url";

@Injectable({
  providedIn: 'root'
})
export class TicketModelService extends RequestService{
  get_one_ticket(id:bigint): Observable<TicketObject[]> {
    return this.get_one('ticket', id) as Observable<TicketObject[]>

  }

  get_tickets():Observable<TicketObject[]>{
    return (this.get('ticket') as Observable<TicketObject[]>)
  }
}
