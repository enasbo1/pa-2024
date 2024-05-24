import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionComponent } from './connection/connection.component';
import { RouterModule } from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {DiconnectionComponent } from './diconnection/diconnection.component';
import {AdminModule} from "./admin/admin.module";
import {VoyageurModule} from "./voyageur/voyageur.module";
import {WpPath} from "../shared/routes";
import {ErrorModule} from "./error/error.module";



@NgModule({
  declarations: [
    ConnectionComponent,
    DiconnectionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminModule,
    ErrorModule,
    VoyageurModule,
    RouterModule.forChild([
      { path: WpPath.login, component: ConnectionComponent},
      { path: WpPath.logout, component: DiconnectionComponent},
      ]
    )
  ]
})
export class ViewModule { }
