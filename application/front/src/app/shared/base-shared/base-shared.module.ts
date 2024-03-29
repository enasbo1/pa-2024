import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {convertToSpacesPipe} from "./convertToSpace.pipe";
import {StarComponent} from "./star/star.component";
import {ImageComponent} from "./image/image.component";
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModaleComponent } from './modale/modale.component';



@NgModule({
  declarations: [
    StarComponent,
    convertToSpacesPipe,
    ImageComponent,
    DropdownComponent,
    ModaleComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StarComponent,
    convertToSpacesPipe,
    ImageComponent,
    DropdownComponent,
    ModaleComponent,
  ]
})
export class BaseSharedModule { }
