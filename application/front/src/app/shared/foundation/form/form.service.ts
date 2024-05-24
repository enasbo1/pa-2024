import { Injectable } from '@angular/core';
import {FormFieldObject, FormFieldValue} from "../../base-shared/form-field/formFieldObject";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  static require_values(formFields:FormFieldObject[], names:string[]):string|void{
    for (const name of names) {
      if (!FormService.get_value(formFields, name)){
        return name
      }
    }
  }

  static get_value(formFields:FormFieldObject[],name:string, defaut?:FormFieldValue):FormFieldValue{
    const v:FormFieldValue = formFields.find((form:FormFieldObject):boolean=>form.name===name)?._value
    return v?v:defaut;
  }

  static get_period(formFields:FormFieldObject[],name:string, defaut?:Date[]):Date[]|undefined{
    const v:Date[]|undefined = formFields.find((form:FormFieldObject):boolean=>form.name===name)?._values
    return v?v:defaut;
  }
}
