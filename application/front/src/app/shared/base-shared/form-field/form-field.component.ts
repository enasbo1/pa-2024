import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormFieldObject} from "./formFieldObject";
import {TranslatorService} from "../translator.service";
import moment from "moment";
import {RegexBase} from "../../RegexBase";

@Component({
  selector: 'pm-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent implements OnInit {
  @Input() field?:FormFieldObject;
  @Output() submit:EventEmitter<string|number|Date|Date[]> = new EventEmitter<string|number|Date|Date[]>();

  date:string = "date";
  start_date?:Date;
  end_date?:Date;
  in: any;
  constructor(public translator:TranslatorService) { }

  ngOnInit(): void {
    if (this.field?.min)
      this.start_date = new Date(this.field?.min);
    moment(this.field?.min).toString()

    if (this.field?.default){
      this.field._value = this.field.default
    }

    if (this.field?.max)
      this.end_date = new Date(this.field?.max);

    if (this.field?.type=="period")
      this.field._values = [
        this.start_date?this.start_date:new Date(),
        this.end_date?this.end_date:new Date()
      ]
    if(this.field?.type=='email'){
      const regex = {regex:RegexBase.email, message:'le champ '+this.field.name+' doit être un email'}
      if (this.field.reg_error){
        if (!this.field.reg_error.includes(regex))
          this.field.reg_error.push(regex);
      }else{
        this.field.reg_error = [
          regex
        ]
      }
    }

    if(this.field?.time){
      this.date = "datetime-local";
    }
  }

  onChange(){
    switch (this.field?.type){
      case "period":
        if (this.start_date && this.end_date)
          this.submit.emit(this.field._values);
        break;
      default:
        if (this.field?._value)
          this.submit.emit(this.field._value);
        break
    }
  }

  onSubmit(value:string){
    if (this.field)
      this.field._value = value;
    this.submit.emit(value);
  }

  is_invalid():boolean{
    const value = this.field?._value?.toString()
    if (this.field?.reg_error){
      return this.field?.reg_error?.find((reg_error):boolean=>
        reg_error.regex.test(value?value:'')
      )==undefined
    }
    return false

  }
  number_limit_pipe(value:number|undefined):number|null{
    return (value!=undefined)?value:null
  }
}
