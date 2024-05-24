export interface FormFieldObject{
  name : string;
  title?:string;
  sclass? : string;
  type : "num"|"longtext"|"dropdown"|"text"|"email"|"password"|"place"|"date"|"period"|"url"|"file"|"regex";
  placeholder? : string|number;
  time?:boolean;
  regex? : string;
  default? : string|number;
  instruction? : string;
  reg_error?: {regex:string; message:string}[];
  choices? : string[];
  _value?:FormFieldValue
  _values?:Date[];
  max?:Date;
  min?:Date;
  step?:number;
  number_limit?: {
    min?:number,
    max?:number
  };
}

export type FormFieldValue=string|Date|number|undefined
