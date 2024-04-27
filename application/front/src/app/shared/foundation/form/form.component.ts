import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormRubricObject, FormStepObject} from "../../base-shared/form-step/formStepObject";
import {TranslatorService} from "../../base-shared/translator.service";
import {FormFieldObject} from "../../base-shared/form-field/formFieldObject";

@Component({
  selector: 'pm-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() items?: FormStepObject[];
  @Input() justify:"center"|"right"|"" = "";
  @Output() submit:EventEmitter<FormFieldObject[]> = new EventEmitter<FormFieldObject[]>();
  public step:number = 0;
  constructor(public translator:TranslatorService) { }

  ngOnInit(): void {
  }

  public get_current():FormStepObject|undefined{
    if (this.items){
      return this.items[this.step];
    }else{
      return undefined;
    }
  }

  public previus_step(){
    --this.step;
  }

  public next_step(){
    ++this.step
  }

  public onSumbit(){
    ++this.step
    if (this.items){
      const value:FormFieldObject[] = [];
      this.items.forEach(
        (step:FormStepObject) =>
          step.content.forEach(
            (rubrics:FormRubricObject)=>
              rubrics.content.forEach(
                (field:FormFieldObject)=>
                  value.push(field)
              )
          )
      )
      this.submit?.emit(
        value
      )
    }
  }
}
