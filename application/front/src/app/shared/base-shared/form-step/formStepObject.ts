import {FormFieldObject} from "../form-field/formFieldObject";

export interface FormStepObject{
  title? : string
  content : FormRubricObject[]
}

export interface FormRubricObject{
  title? : string
  content : FormFieldObject[]
}


