import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {convertToSpacesPipe} from "./convertToSpace.pipe";
import {StarComponent} from "./star/star.component";
import {ImageComponent} from "./image/image.component";
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModaleComponent } from './modale/modale.component';
import { RubricComponent } from './rubric/rubric.component';



@NgModule({
  declarations: [
    StarComponent,
    convertToSpacesPipe,
    ImageComponent,
    DropdownComponent,
    ModaleComponent,
    RubricComponent,
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
    RubricComponent
  ]
})
export class BaseSharedModule { }
