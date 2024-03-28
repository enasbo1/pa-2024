import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "./list/list.component";
import {BaseSharedModule} from "../base-shared/base-shared.module";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    BaseSharedModule,
    CommonModule,
    RouterLink
  ],
  exports: [
    ListComponent
  ]
})
export class FoundationModule { }
