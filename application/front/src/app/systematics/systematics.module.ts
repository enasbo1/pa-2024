import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminHeaderComponent} from "./admin-header/admin-header.component";
import {RouterLinkWithHref} from "@angular/router";
import { HeaderComponent } from './header/header.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    AdminHeaderComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    SharedModule,
  ],
  exports:[
    AdminHeaderComponent,
    HeaderComponent
  ]
})
export class SystematicsModule { }
