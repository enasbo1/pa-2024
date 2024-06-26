import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BailleurPrestationModule} from "./prestation/bailleur-prestation.module";
import {RouterModule} from "@angular/router";
import {WpPath} from "../../shared/routes";
import {WelcomeComponent} from "../exemple/home/welcome.component";



@NgModule({
  declarations: [],
  imports: [
    BailleurPrestationModule,
    CommonModule,
    RouterModule.forChild([
          { path: WpPath.bailleur.home, component: WelcomeComponent},
          { path: WpPath.bailleur.root, redirectTo: WpPath.bailleur.home, pathMatch: 'full'},
        ]

    )
  ]
})
export class BailleurModule { }
