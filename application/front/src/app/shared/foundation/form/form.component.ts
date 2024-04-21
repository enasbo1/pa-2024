import {Component, Input, OnInit} from '@angular/core';
import {FormStepObject} from "../../base-shared/form-step/formStepObject";

@Component({
  selector: 'pm-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() items?: FormStepObject[];
  public step:number = 0;
  constructor() { }

  ngOnInit(): void {
  }

  public get_current():FormStepObject|undefined{
    if (this.items){
      return this.items[this.step];
    }else{
      return undefined;
    }
  }

}
