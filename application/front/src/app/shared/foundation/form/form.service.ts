import { Injectable } from '@angular/core';
import {FormFieldObject, FormFieldValue} from "../../base-shared/form-field/formFieldObject";
import {DateService} from "../../../http/shared/date.service";

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

  static get_period(formFields:FormFieldObject[],name:string, defaut?:Date[]):{start:string, end:string}{
    let dates:Date[]|undefined = formFields.find((form:FormFieldObject):boolean=>form.name===name)?._values;
    dates = dates?dates:defaut;
    if (dates){
      return {
        start:DateService.to_api(dates[0]),
        end :DateService.to_api(dates[1])
      }
    }else{
      return {
        start:DateService.to_api(),
        end :DateService.to_api()
      }
    }
  }

  static get_value(formFields:FormFieldObject[],name:string, defaut?:FormFieldValue):FormFieldValue{
    const v:FormFieldValue = formFields.find((form:FormFieldObject):boolean=>form.name===name)?._value
    return v?v:defaut;
  }
}
