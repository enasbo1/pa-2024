import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListComponent} from "./list/list.component";
import {BaseSharedModule} from "../base-shared/base-shared.module";
import {RouterLink, RouterLinkWithHref} from "@angular/router";
import { InfoBandComponent } from './info-band/info-band.component';
import {FormsModule} from "@angular/forms";
import { RubricListComponent } from './rubric-list/rubric-list.component';
import { ChatComponent } from './chat/chat.component';
import { FormComponent } from './form/form.component';



@NgModule({
  declarations: [
    ListComponent,
    InfoBandComponent,
    RubricListComponent,
    ChatComponent,
    FormComponent,
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
    InfoBandComponent,
    RubricListComponent,
    ChatComponent,
    FormComponent
  ]
})
export class FoundationModule { }
