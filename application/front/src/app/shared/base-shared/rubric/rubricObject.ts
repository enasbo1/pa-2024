export interface RubricObject{
  title? : string
  content: RubricElement[]
}

export interface RubricElement{
  name : string
  type : "text"|"file"|"pannel"|"modale"|"image"
  text : string
  value? : string|RubricObject[]
}
