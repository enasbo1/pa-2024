import { Component, OnInit } from '@angular/core';
import {RubricObject} from "../../../../shared/base-shared/rubric/rubricObject";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {GlobalService} from "../../../../shared/global.service";
import {TicketObject} from "../../../../http/model/ticket-model/ticketObject";
import {TicketModelService} from "../../../../http/model/ticket-model/ticket-model.service";
import {TicketMapperService} from "../../../../mapper/ticket-mapper.service";

@Component({
  selector: 'pm-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {
  ticket_rubric?: RubricObject;
  protected ticket?:TicketObject;
  constructor(
    private route : ActivatedRoute,
    private ticketModelService : TicketModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Ticket";
    this.route.params.subscribe(
      (params:Params):void=>{
        this.ticketModelService.get_one_ticket(params['id']).subscribe(
          (ticket)=>{
            if (ticket!=[]){
              this.setticket(
                ticket[0]
              )
            }
          }
        )
      }
    )
  }

  private setticket(ticket:TicketObject):void{
    this.ticket = ticket;
    this.ticket_rubric = TicketMapperService.model_to_rubric(ticket);
  }
}
