import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from '../exemple/home/welcome.component';
import {MyservicesModule} from "./myservices/myservices.module";
import {WpPath} from "../../shared/routes";




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    MyservicesModule,
    RouterModule.forChild([
        { path: WpPath.voyageur.home, component: WelcomeComponent},
        { path: WpPath.voyageur.root, redirectTo: WpPath.voyageur.home, pathMatch: 'full'},
      ]
    )
  ]
})
export class VoyageurModule { }
