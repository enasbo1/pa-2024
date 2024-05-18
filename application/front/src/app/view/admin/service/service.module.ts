import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { GestionServicesComponent } from './gestion-services/gestion-services.component';
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    GestionServicesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path: 'admin/services', component: GestionServicesComponent}
    ]),
  ]
})
export class ServiceModule { }
