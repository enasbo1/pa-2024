import {Component, Input, OnInit} from '@angular/core';
import {RubricObject} from "./rubricObject";
import {TranslatorService} from "../translator.service";
import {ModaleService} from "../../foundation/modale/modale.service";

@Component({
  selector: 'pm-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.scss']
})
export class RubricComponent implements OnInit {
  @Input() content?:RubricObject;

  constructor(public translatorService:TranslatorService,
              ) { }
  ngOnInit(): void {
  }

  open_image(src?:string|RubricObject|number):void{
    ModaleService.createImageModal(<string> src)
  }

  open_pannel(src?:string|RubricObject|number):void {
    ModaleService.createRubricModal(<RubricObject> src)
  }

  rate(value?:string|RubricObject|number):number{
    return <number>value;
  }
}
