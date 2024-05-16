import { Injectable } from '@angular/core';
import {ModalObject} from "./foundation/modale/modalObject";

type cookiesType = {token?:string}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor() { }
  private static get cookie():cookiesType{
    try {
      return JSON.parse(document.cookie);
    }catch(a){
      this.cookie = {};
      return {};
    }
  }

  private static set cookie(cookie:cookiesType){
    document.cookie = JSON.stringify(cookie)
  }

  public static get token():string|undefined{
    return GlobalService.cookie.token
  }
  public static set token(token:string|undefined){
    let n = GlobalService.cookie
    n.token = token;
    GlobalService.cookie = n;
  }

  public static get modalCurrent():ModalObject{
    return (window as any).modalCurrent;
  }

  public static set modalCurrent(modal:ModalObject){
    (window as any).modalCurrent = modal
  }
}
