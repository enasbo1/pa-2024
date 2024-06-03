import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {GlobalService} from "../../../../shared/global.service";
import {TicketModelService} from "../../../../http/model/ticket-model/ticket-model.service";
import {ListObject} from "../../../../shared/foundation/list/listObject";
import {FilterObject} from "../../../../shared/foundation/list/filterObject";
import {TicketObject} from "../../../../http/model/ticket-model/ticketObject";
import {TicketMapperService} from "../../../../mapper/ticket-mapper.service";

@Component({
  selector: 'pm-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets:ListObject[] = [];
  filters:FilterObject[] = [
    {name : 'workflow' , type:'choice', choices:['wip','todo', 'done']},
    {name : 'date_debut' , type:'auto'},
    {name : 'date_modif' , type:'auto'},
    {name : 'target', type:'auto'},
  ]
  critera : string[] = [
    'reporter',
    'number'
  ];
  constructor(
    private route :ActivatedRoute,
    private ticketModelService:TicketModelService
  ) { }

  ngOnInit(): void {
    GlobalService.pageName = "Tickets";
    this.route.queryParams.subscribe((query:Params)=>{
      if (query["state"]){
        this.filters[0].type = 'choice'
        this.filters[0].set = true
        this.filters[0].default = query["state"]
      }
      this.ticketModelService.get_tickets()
        .subscribe(
          (tickets:TicketObject[]):void=>
          {
            this.tickets =
              tickets.map(
                (sObject:TicketObject)=>
                  TicketMapperService.model_to_list(sObject)
              )
          }
        )
      }
    )
  }
}
