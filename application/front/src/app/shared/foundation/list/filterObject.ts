export interface FilterObject {
  name:string;
  type:"bool"|"choice"|"search"|"auto";
  choices:string[];
}
export interface _FilterObject extends FilterObject{
  name:string;
  type:"bool"|"choice"|"search"|"auto";
  choices:string[];
  value:string|boolean|undefined;
}
