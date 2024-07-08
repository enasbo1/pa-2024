import { Injectable } from '@angular/core';
import {_FilterObject} from "./filterObject";
import {ListObjectPropriety} from "./listObject";
import moment from "moment";
import {DateService} from "../../../http/shared/date.service";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  static isConforme(filter?:_FilterObject, property?:ListObjectPropriety):boolean{
    if (property?.value!==undefined && filter?.value!==undefined){
      switch(filter.type){
        case "free":
          const period1 = (property.value as string[]).map(val => val.toString().split(" - ").map(x=> moment(x, DateService.FORMAT_FRONT)));
          const test1 = filter.value?.toString().split(" - ").map(x=> moment(x, DateService.FORMAT_FRONT));
          console.log(test1);
          return !period1.find(per => DateService.isCommonPeriod({start:per[0], end:per[1]},  {start:test1[0], end:test1[1]}));
        case "period":
          const period = property.value?.toString().split(" - ").map(x=> moment(x, DateService.FORMAT_FRONT));
          const test = filter.value?.toString().split(" - ").map(x=> moment(x, DateService.FORMAT_FRONT));
          return DateService.isInPeriod({start:period[0], end:period[1]},  {start:test[0], end:test[1]})
        default:
          return  property?.value?.toString().toLowerCase().includes((filter.value?? "").toString().toLowerCase()) ?? false;
      }
    }
    return true;
  }
}
