import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { GestionServicesComponent } from './gestion-services/gestion-services.component';
import {SharedModule} from "../../../shared/shared.module";
import { DetailServiceComponent } from './detail-service/detail-service.component';
import { ServiceRenduListComponent } from './service-rendu-list/service-rendu-list.component';
import { DetailServiceRenduComponent } from './detail-service-rendu/detail-service-rendu.component';



@NgModule({
  declarations: [
    GestionServicesComponent,
    DetailServiceComponent,
    ServiceRenduListComponent,
    DetailServiceRenduComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'admin/service_rendu/:id', component: DetailServiceRenduComponent},
      {path: 'admin/service_rendu', component: ServiceRenduListComponent},
      {path: 'admin/services/:id', component: DetailServiceComponent},
      {path: 'admin/services', component: GestionServicesComponent}
    ]),
  ]
})
export class ServiceModule { }
