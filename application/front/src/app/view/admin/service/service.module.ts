import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { GestionServicesComponent } from './gestion-services/gestion-services.component';



@NgModule({
  declarations: [
    GestionServicesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'admin/services', component: GestionServicesComponent}
    ])
  ]
})
export class ServiceModule { }
