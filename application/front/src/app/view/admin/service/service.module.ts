import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { GestionServicesComponent } from './gestion-services/gestion-services.component';
import {SharedModule} from "../../../shared/shared.module";
import { DetailServiceComponent } from './detail-service/detail-service.component';



@NgModule({
  declarations: [
    GestionServicesComponent,
    DetailServiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'admin/services/:id', component: DetailServiceComponent},
      {path: 'admin/services', component: GestionServicesComponent}
    ]),
  ]
})
export class ServiceModule { }
