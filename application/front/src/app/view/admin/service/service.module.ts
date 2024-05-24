import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { GestionServicesComponent } from './gestion-services/gestion-services.component';
import {SharedModule} from "../../../shared/shared.module";
import { DetailServiceComponent } from './detail-service/detail-service.component';
import { ServiceRenduListComponent } from './service-rendu-list/service-rendu-list.component';
import { DetailServiceRenduComponent } from './detail-service-rendu/detail-service-rendu.component';
import {WpPath} from "../../../shared/routes";



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
      {path: WpPath.admin.services.detail_presta, component: DetailServiceRenduComponent},
      {path: WpPath.admin.services.presta, component: ServiceRenduListComponent},
      {path: WpPath.admin.services.detail, component: DetailServiceComponent},
      {path: WpPath.admin.services.root, component: GestionServicesComponent}
    ]),
  ]
})
export class ServiceModule { }
