import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {convertToSpacesPipe} from "./convertToSpace.pipe";
import {StarComponent} from "./star/star.component";
import {ImageComponent} from "./image/image.component";
import { DropdownComponent } from './dropdown/dropdown.component';
import { ModaleComponent } from './modale/modale.component';
import { RubricComponent } from './rubric/rubric.component';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { FormStepComponent } from './form-step/form-step.component';
import { FormFieldComponent } from './form-field/form-field.component';
import {FormsModule} from "@angular/forms";
import {DateForHtmlPipe} from "./date-for-html.pipe";
import { LineComponent } from './line/line.component';



@NgModule({
  declarations: [
    StarComponent,
    convertToSpacesPipe,
    ImageComponent,
    DropdownComponent,
    ModaleComponent,
    RubricComponent,
    ChatBubbleComponent,
    FormStepComponent,
    FormFieldComponent,
    DateForHtmlPipe,
    LineComponent
  ],
  imports: [
      CommonModule,
      FormsModule
  ],
  exports: [
    StarComponent,
    convertToSpacesPipe,
    DateForHtmlPipe,
    ImageComponent,
    DropdownComponent,
    ModaleComponent,
    RubricComponent,
    FormStepComponent,
    FormFieldComponent
  ]
})
export class BaseSharedModule { }
