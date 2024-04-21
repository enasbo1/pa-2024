import { Component, OnInit } from '@angular/core';
import {FormStepObject} from "../../shared/base-shared/form-step/formStepObject";

@Component({
  selector: 'pm-gen-form',
  templateUrl: './gen-form.component.html',
  styleUrls: ['./gen-form.component.scss']
})
export class GenFormComponent implements OnInit {
  public items:FormStepObject[]=[]
  constructor() { }

  ngOnInit(): void {
  }

}
