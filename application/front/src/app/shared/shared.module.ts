import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {FoundationModule} from "./foundation/foundation.module";
import {BaseSharedModule} from "./base-shared/base-shared.module";



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FoundationModule,
    BaseSharedModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    BaseSharedModule,
    FoundationModule,
  ]
})
export class SharedModule { }
