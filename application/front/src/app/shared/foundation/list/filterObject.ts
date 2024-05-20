import {EventEmitter} from "@angular/core";

export interface FilterObject {
  name:string;
  type:"bool"|"choice"|"search"|"auto";
  choices?:string[];
  set?:boolean;
  default?:string

}
export interface _FilterObject extends FilterObject{
  name:string;
  type:"bool"|"choice"|"search"|"auto";
  choices:string[];
  value?:string|boolean;
  default?:string
}
