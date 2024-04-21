export interface FormFieldObject{
  name : string;
  sclass : string;
  type : "dropdown"|"place"|"date"|"period"|"url"|"file"|"regex";
  placeholder? : string;
  regex? : string;
  default? : string;
  instruction? : string;
  reg_error?: {regex:string; message:string}[]
  choices? : string[]
}
