import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {StarComponent} from "./star.component";
import {convertToSpacesPipe} from "./convertToSpace.pipe";
import { ImageComponent } from './image/image.component';



@NgModule({
  declarations: [
    StarComponent,
    convertToSpacesPipe,
    ImageComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    convertToSpacesPipe,
    StarComponent,
    ImageComponent,
    CommonModule,
    FormsModule,
  ]
})
export class SharedModule { }
