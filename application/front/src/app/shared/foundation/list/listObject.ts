import {TextStyle} from "../../base-shared/textStyle";

export interface ListObject {
  link : string|undefined;
  title: string|undefined;
  image: string|undefined;
  right: [
    TextStyle|null,
    TextStyle|null,
    TextStyle|null,
  ]|undefined
  mid: [
    TextStyle|null,
    TextStyle|null,
    TextStyle|null,
  ]|undefined;
  left: [
    TextStyle|null,
    TextStyle|null,
    TextStyle|null,
  ]|undefined;
  propriete : ListObjectPropriety[]|undefined;
}

export interface ListObjectPropriety {
  name:string;
  value:string|number|boolean;
}
