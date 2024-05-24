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
    const current = this.get_current()
    let error:boolean = current?.content.find((rubric:FormRubricObject):boolean=>
      rubric.content.find(
        (field:FormFieldObject):boolean=>{
          const val = field._value?.toString();
          return field.reg_error?.find(
            (regtest):boolean=>{
              if (!regtest.regex.test(val?val:'')){
                current.errorEvent?.emit(regtest.message)
                return true;
              }
              return false;
            }
          )!==undefined;
        }
      )!==undefined
    )!==undefined
    if (error){
      return
    }
    if (current?.validator){
      const verified:boolean|EventEmitter<boolean> = current.validator(
        current,
      );
      if (verified === true){
        this._next_step()
        return;
      } else if (verified === false){
        return;
      } else{
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
