import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {convertToSpacesPipe} from "./convertToSpace.pipe";
import {StarComponent} from "./star/star.component";
import {ImageComponent} from "./image/image.component";



@NgModule({
  declarations: [
    StarComponent,
    convertToSpacesPipe,
    ImageComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    StarComponent,
    convertToSpacesPipe,
    ImageComponent,
  ]
})
export class BaseSharedModule { }
