import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BailleurReservationListComponent } from './bailleur-reservation-list/bailleur-reservation-list.component';
import {FoundationModule} from "../../../shared/foundation/foundation.module";
import {RouterModule} from "@angular/router";
import {WpPath} from "../../../shared/routes";
import { BailleurReservationDetailComponent } from './bailleur-reservation-detail/bailleur-reservation-detail.component';
import {BaseSharedModule} from "../../../shared/base-shared/base-shared.module";



@NgModule({
  declarations: [
    BailleurReservationListComponent,
    BailleurReservationDetailComponent
  ],
  imports: [
    CommonModule,
    FoundationModule,
    RouterModule.forChild([
      {path: WpPath.bailleur.reservation.detail, component: BailleurReservationDetailComponent},
      {path: WpPath.bailleur.reservation.root, component: BailleurReservationListComponent},
    ]),
    BaseSharedModule
  ]
})
export class BailReservationModule { }
