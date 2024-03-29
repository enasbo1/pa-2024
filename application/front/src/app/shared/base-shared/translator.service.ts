import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  constructor() { }
  echo(value:string|undefined , default_value:string = ""):string{
    return value ? value: default_value;
  }

}
