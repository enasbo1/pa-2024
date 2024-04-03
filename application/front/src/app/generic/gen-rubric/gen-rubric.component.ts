import { Component, OnInit } from '@angular/core';
import {RubricObject} from "../../shared/base-shared/rubric/rubricObject";

@Component({
  templateUrl: './gen-rubric.component.html',
  styleUrls: ['./gen-rubric.component.scss']
})
export class GenRubricComponent implements OnInit {
  items:RubricObject[] = [{
    title : "rubric 1",
    content: [
      {name:"text 1", text: "value 1", type:"text"},
      {name:"text 2", text: "value 2", type:"text"},
      {name:"text 3", text: "value 3", type:"text"},
      {name:"text 4", text: "value 4", type:"text"}
    ]
  }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
