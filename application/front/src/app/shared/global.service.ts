import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor() { }
  public static get token():string{
    return (window as any).token;
  }
  public static set token(token:string){
    (window as any).token = token;
  }

  public static get globalVar():string{
    return (window as any).globalVar;
  }
}
