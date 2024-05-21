import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionComponent } from './connection/connection.component';
import { RouterModule } from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import { DiconnectionComponent } from './diconnection/diconnection.component';
import {AdminModule} from "./admin/admin.module";



@NgModule({
  declarations: [
    ConnectionComponent,
    DiconnectionComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SharedModule,
    AdminModule,
    RouterModule.forChild([
      { path: 'connection', component: ConnectionComponent},
      { path: 'disconnection', component: DiconnectionComponent},
      ]
    )
  ]
})
export class ViewModule { }
