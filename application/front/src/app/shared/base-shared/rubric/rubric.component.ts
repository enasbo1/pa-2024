import {Component, Input, OnInit} from '@angular/core';
import {RubricObject} from "./rubricObject";
import {TranslatorService} from "../translator.service";

@Component({
  selector: 'pm-rubric',
  templateUrl: './rubric.component.html',
  styleUrls: ['./rubric.component.scss']
})
export class RubricComponent implements OnInit {
  @Input() content?:RubricObject;
  constructor(public translatorService:TranslatorService) { }

  ngOnInit(): void {
  }

}
