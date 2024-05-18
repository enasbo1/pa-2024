export interface RubricObject{
  title? : string
  content: RubricElement[]
}

export interface RubricElement{
  name : string
  type : "text"|"file"|"panel"|"modal"|"image"|"stars"
  text ?: string
  value? : string|RubricObject|number
}
