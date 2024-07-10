import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import { PrestatePrestaListComponent } from './prestate-presta-list/prestate-presta-list.component';
import {FoundationModule} from "../../../shared/foundation/foundation.module";
import {WpPath} from "../../../shared/routes";
import {WelcomeComponent} from "../../exemple/home/welcome.component";



@NgModule({
  declarations: [
    PrestatePrestaListComponent
  ],
  imports: [
    CommonModule,
    FoundationModule,
    RouterModule.forChild([
      { path: WpPath.prestate.presta.root, component: PrestatePrestaListComponent},
    ]),
  ]
})
export class PrestatePrestaModule { }
