import { Injectable } from '@angular/core';
import {RequestService} from "../../shared/request.service";
import {Observable} from "rxjs";
import {TicketObject} from "./ticketObject";

@Injectable({
  providedIn: 'root'
})
export class TicketModelService extends RequestService{
  get_tickets():Observable<TicketObject[]>{
    return (this.get('ticket') as Observable<TicketObject[]>)
  }
}
