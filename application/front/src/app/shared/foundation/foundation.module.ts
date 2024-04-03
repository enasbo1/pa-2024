import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "./list/list.component";
import {BaseSharedModule} from "../base-shared/base-shared.module";
import {RouterLink, RouterLinkWithHref} from "@angular/router";
import { InfoBandComponent } from './info-band/info-band.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ListComponent,
    InfoBandComponent,
  ],
    imports: [
        BaseSharedModule,
        CommonModule,
        RouterLinkWithHref,
        RouterLink,
        FormsModule
    ],
    exports: [
        ListComponent,
        InfoBandComponent
    ]
})
export class FoundationModule { }
