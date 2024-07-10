import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoyageurServiceComponent } from './voyageur-service/voyageur-service.component';
import {FoundationModule} from "../../../shared/foundation/foundation.module";
import {RouterModule} from "@angular/router";
import {WpPath} from "../../../shared/routes";



@NgModule({
  declarations: [
    VoyageurServiceComponent
  ],
  imports: [
    CommonModule,
    FoundationModule,
    RouterModule.forChild([
      { path: WpPath.voyageur.myServices, component: VoyageurServiceComponent}
    ])
  ]

})
export class MyServicesModule { }
