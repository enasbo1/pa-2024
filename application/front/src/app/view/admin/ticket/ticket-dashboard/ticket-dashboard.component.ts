import { Component, OnInit } from '@angular/core';
import {WpPath} from "../../../../shared/routes";
import {GlobalService} from "../../../../shared/global.service";

@Component({
  selector: 'pm-ticket-dashboard',
  templateUrl: './ticket-dashboard.component.html',
  styleUrls: ['./ticket-dashboard.component.scss']
})
export class TicketDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    GlobalService.pageName = 'Tickets'
  }

  protected readonly WpPath = WpPath;
}
