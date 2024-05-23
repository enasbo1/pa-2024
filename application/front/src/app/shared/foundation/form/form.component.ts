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

  public next_step():EventEmitter<boolean>|void{
    if (this.get_current()?.validator){
      // @ts-ignore
      const verified:boolean|EventEmitter<boolean> = this.get_current()?.validator(
        // @ts-ignore
        this.get_current(),
      );
      if (verified === true){
        console.log("verified = true");
        this._next_step()
      } else if (verified === false){
        console.log("verified = false")
      } else{
        console.log("verified = Event")
        verified.subscribe(
          (val:boolean):void  =>
            val?this._next_step():undefined
        )
        return verified;
      }

    }else{
      this._next_step()
    }
  }

  private _next_step(){
    ++this.step
  }

  public onSumbit(){
    let verif:void|EventEmitter<boolean>= this.next_step();
    if (verif){
      verif.subscribe(
        (val:boolean):void=>
          val?this._submit():undefined
      )
    }else{
      this._submit()
    }
  }

  private _submit():void{
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
