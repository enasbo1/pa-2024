import {FormFieldObject} from "../form-field/formFieldObject";

export interface FormStepObject{
  title? : string
  content : FormRubricObject[]
  validator? : (nextstep:()=>void, step:number)=>void;
}

export interface FormRubricObject{
  title? : string
  content : FormFieldObject[]
}


