import {EventEmitter} from "@angular/core";

export interface FilterObject {
  name:string;
  type:"bool"|"choice"|"search"|"auto"|"hided";
  choices?:string[];
  set?:boolean;
  default?:string

}
export interface _FilterObject extends FilterObject{
  name:string;
  type:"bool"|"choice"|"search"|"auto"|"hided";
  choices:string[];
  value?:string|boolean;
  set_value?:string;
  default?:string
}
