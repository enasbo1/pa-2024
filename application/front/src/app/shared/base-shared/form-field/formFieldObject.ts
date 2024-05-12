export interface FormFieldObject{
  name : string;
  title?:string;
  sclass? : string;
  type : "dropdown"|"text"|"email"|"password"|"place"|"date"|"period"|"url"|"file"|"regex";
  placeholder? : string;
  time?:boolean;
  regex? : string;
  default? : string;
  instruction? : string;
  reg_error?: {regex:string; message:string}[]
  choices? : string[],
  _value?:string|Date,
  _values?:Date[]
  max?:Date,
  min?:Date
}
