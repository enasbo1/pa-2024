export interface RubricObject{
  title? : string
  content: RubricElement[]
}

export interface RubricElement{
  name : string
  type : "text"|"file"|"panel"|"modal"|"image"
  text : string
  value? : string|RubricObject[]
}
