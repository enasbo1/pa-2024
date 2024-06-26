import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {WpPath} from "../../../shared/routes";
import {ToBeImplementedComponent} from "../../../shared/foundation/to-be-implemented/to-be-implemented.component";
import { TicketDashboardComponent } from './ticket-dashboard/ticket-dashboard.component';
import {TicketListComponent} from "./ticket-list/ticket-list.component";
import {SharedModule} from "../../../shared/shared.module";
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';


@NgModule({
  declarations: [
    TicketDashboardComponent,
    TicketListComponent,
    TicketDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
        {path: WpPath.admin.tickets.list, component: TicketListComponent},
        {path: WpPath.admin.tickets.dashboard, component: TicketDashboardComponent},
        {path: WpPath.admin.tickets.root, component: TicketDashboardComponent},
        {path: WpPath.admin.tickets.detail, component: TicketDetailComponent},
      ]
    ),
    SharedModule
  ]
})
export class TicketModule { }
