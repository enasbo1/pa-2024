import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslatorService {
  constructor() { }
  echo(value:string|undefined):string{
    return value ? value: "";
  }

}
