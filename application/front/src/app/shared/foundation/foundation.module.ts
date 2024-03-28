import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "./list/list.component";
import {BaseSharedModule} from "../base-shared/base-shared.module";



@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    BaseSharedModule,
    CommonModule
  ],
  exports: [
    ListComponent
  ]
})
export class FoundationModule { }
