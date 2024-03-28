import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";
import {HomeComponent} from "./home.component";
import {RouterLink, RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    HomeComponent
  ],
  exports: [
    HomeComponent
  ],
    imports: [
      SharedModule,
      RouterModule.forChild([
        {path: 'group-page', component:HomeComponent}
      ])
    ]
})
export class HomeModule { }
