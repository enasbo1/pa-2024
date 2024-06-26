import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPrestaComponent } from './list-presta/list-presta.component';
import {FoundationModule} from "../../../shared/foundation/foundation.module";
import {RouterModule} from "@angular/router";
import {WpPath} from "../../../shared/routes";
import {WelcomeComponent} from "../../exemple/home/welcome.component";
import { BailleurPrestaComponent } from './bailleur-presta/bailleur-presta.component';
import {BaseSharedModule} from "../../../shared/base-shared/base-shared.module";



@NgModule({
  declarations: [
    ListPrestaComponent,
    BailleurPrestaComponent
  ],
  imports: [
    CommonModule,
    FoundationModule,
    RouterModule.forChild([
        {path: WpPath.bailleur.prestation, component: BailleurPrestaComponent},
        {path: WpPath.bailleur.prestations, component: ListPrestaComponent},
      ]
    ),
    BaseSharedModule
  ]
})
export class BailleurPrestationModule { }
