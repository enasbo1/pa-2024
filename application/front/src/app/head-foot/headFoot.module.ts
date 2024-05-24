import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminHeaderComponent} from "./admin-header/admin-header.component";
import {RouterLink, RouterLinkWithHref} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import { SharedModule } from "../shared/shared.module";
import { VoyageurHeaderComponent } from './voyageur-header/voyageur-header.component';



@NgModule({
  declarations: [
    AdminHeaderComponent,
    HeaderComponent,
    VoyageurHeaderComponent
  ],
    imports: [
        CommonModule,
        RouterLinkWithHref,
        SharedModule,
        RouterLink,
    ],
  exports:[
    VoyageurHeaderComponent,
    AdminHeaderComponent,
    HeaderComponent
  ]
})
export class HeadFootModule { }
