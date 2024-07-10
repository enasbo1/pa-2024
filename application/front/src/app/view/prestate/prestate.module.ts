import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ServicesModule} from "./services/services.module";
import {RouterModule} from "@angular/router";
import {WpPath} from "../../shared/routes";
import {WelcomeComponent} from "../exemple/home/welcome.component";
import {PrestatePrestaModule} from "./prestate-presta/prestate-presta.module";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ServicesModule,
    PrestatePrestaModule,
    RouterModule.forChild([
      { path: WpPath.prestate.home, component: WelcomeComponent},
      { path: WpPath.prestate.root, redirectTo: WpPath.prestate.home, pathMatch: 'full' },
    ])
  ]
})
export class PrestateModule { }
