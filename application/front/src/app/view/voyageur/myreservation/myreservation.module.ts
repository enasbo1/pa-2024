import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {WpPath} from "../../../shared/routes";
import {WelcomeComponent} from "../../exemple/home/welcome.component";
import { VoyageurReservationComponent } from './voyageur-reservation/voyageur-reservation.component';
import {SharedModule} from "../../../shared/shared.module";
import { VoyageurReservationDetailComponent } from './voyageur-reservation-detail/voyageur-reservation-detail.component';



@NgModule({
  declarations: [
    VoyageurReservationComponent,
    VoyageurReservationDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: WpPath.voyageur.myReservation.detail, component: VoyageurReservationDetailComponent},
      {path: WpPath.voyageur.myReservation.root, component: VoyageurReservationComponent},
    ]),
    SharedModule
  ]
})
export class MyReservationModule { }
