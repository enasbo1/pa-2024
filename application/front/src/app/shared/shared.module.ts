import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {StarComponent} from "./star.component";
import {convertToSpacesPipe} from "./convertToSpace.pipe";
import { AdminHeaderComponent } from './systematics/admin-header/admin-header.component';



@NgModule({
  declarations: [
    StarComponent,
    convertToSpacesPipe,
    AdminHeaderComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    convertToSpacesPipe,
    StarComponent,
    CommonModule,
    FormsModule,
    AdminHeaderComponent
  ]
})
export class SharedModule { }
