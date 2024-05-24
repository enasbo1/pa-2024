import { Injectable } from '@angular/core';
import moment from "moment";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  static to_api(date?:Date):string{
    date = date?date:new Date();
    return moment(date).format("MM/DD/YYYY");
  }

  static to_front(date?:string|Date):string{
    return moment(date).format("DD/MM/YYYY");
  }
}
