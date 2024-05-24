import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoyageurServiceComponent } from './voyageur-service/voyageur-service.component';
import {FoundationModule} from "../../../shared/foundation/foundation.module";
import {RouterModule} from "@angular/router";
import {WpPath} from "../../../shared/routes";
import {WelcomeComponent} from "../../exemple/home/welcome.component";
import {VoyageurModule} from "../voyageur.module";



@NgModule({
  declarations: [
    VoyageurServiceComponent
  ],
  imports: [
    CommonModule,
    FoundationModule,
    RouterModule.forChild([
      { path: WpPath.voyageur.myservices, component: VoyageurServiceComponent}
    ])
  ]

})
export class MyservicesModule { }
